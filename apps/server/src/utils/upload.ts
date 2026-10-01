import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function getUploadDir() {
  return UPLOAD_DIR;
}

export interface SavedFile {
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

/**
 * 保存单个上传文件，做魔数校验 + 大小限制 + 随机文件名防遍历
 */
export async function saveUploadedFile(
  buffer: Buffer,
  originalName: string,
): Promise<SavedFile> {
  // 大小校验
  if (buffer.length > MAX_SIZE) {
    throw new UploadError('FILE_TOO_LARGE', `文件超过 ${MAX_SIZE / 1024 / 1024}MB 限制`);
  }
  if (buffer.length === 0) {
    throw new UploadError('EMPTY_FILE', '文件不能为空');
  }

  // 魔数校验
  const type = await fileTypeFromBuffer(buffer);
  if (!type || !ALLOWED_MIME.includes(type.mime)) {
    throw new UploadError('INVALID_TYPE', '只支持 JPG/PNG/GIF/WebP 图片');
  }

  // 扩展名从魔数推导，不信任原始文件名
  const ext = '.' + type.ext;
  if (!ALLOWED_EXT.includes(ext.toLowerCase())) {
    throw new UploadError('INVALID_TYPE', '不支持的图片格式');
  }

  // 随机文件名，防路径遍历
  const randomName = randomUUID().replace(/-/g, '') + ext;
  const filePath = path.join(UPLOAD_DIR, randomName);

  // 双重校验：确保路径确实在 uploads 目录内
  const realDir = fs.realpathSync(UPLOAD_DIR);
  const realDest = path.resolve(filePath);
  if (!realDest.startsWith(realDir + path.sep)) {
    throw new UploadError('SECURITY_ERROR', '非法路径');
  }

  fs.writeFileSync(filePath, buffer);

  return {
    filename: originalName,
    url: `/uploads/${randomName}`,
    size: buffer.length,
    mimeType: type.mime,
  };
}

export function deleteUploadedFile(url: string) {
  if (!url.startsWith('/uploads/')) return;
  const filename = url.replace('/uploads/', '');
  // 再校验一次：文件名只能包含安全字符
  if (!/^[\w.-]+$/.test(filename)) return;
  const filePath = path.join(UPLOAD_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // ignore
  }
}

export class UploadError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'UploadError';
  }
}
