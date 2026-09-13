import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '星光璀璨项链',
    nameEn: 'Stellar Glow Necklace',
    price: 2680,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    category: 'necklaces',
    description: '以星辰为灵感，镶嵌細緻锆石，在光線下闪耀迷人光芒。',
    details: ['925 纯银鍍 14K 金', '锆石镶嵌', '鏈長 40cm + 5cm 延長鏈', '附品牌包装盒'],
    material: '925 纯银',
    isNew: true,
    stock: 15,
  },
  {
    id: '2',
    name: '月光珍珠手链',
    nameEn: 'Moonlight Pearl Bracelet',
    price: 1980,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f3432e2?w=600&h=600&fit=crop',
    category: 'bracelets',
    description: '精选天然淡水珍珠，手工串聯，呈現优雅气质。',
    details: ['天然淡水珍珠', '925 纯银扣頭', '手圍 16cm + 3cm 延長鏈', '附品牌包装盒'],
    material: '天然珍珠',
    isBestSeller: true,
    stock: 23,
  },
  {
    id: '3',
    name: '永恒之約戒指',
    nameEn: 'Eternal Promise Ring',
    price: 3280,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    category: 'rings',
    description: '简约線條设计，象徵永恒的愛情承诺。',
    details: ['925 纯银鍍 18K 金', '開口设计可微調', '寬度 2mm', '附品牌包装盒'],
    material: '925 纯银',
    isBestSeller: true,
    stock: 8,
  },
  {
    id: '4',
    name: '露珠耳环',
    nameEn: 'Dewdrop Earrings',
    price: 1580,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7d87327123?w=600&h=600&fit=crop',
    category: 'earrings',
    description: '如清晨露珠般晶莹剔透，为日常增添亮點。',
    details: ['925 纯银', '锆石镶嵌', '耳針式', '附品牌包装盒'],
    material: '925 纯银',
    isNew: true,
    stock: 30,
  },
  {
    id: '5',
    name: '葉脈项链',
    nameEn: 'Leaf Vein Necklace',
    price: 2280,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83bf8b1?w=600&h=600&fit=crop',
    category: 'necklaces',
    description: '大自然的饋贈，精致葉脈紋路栩栩如生。',
    details: ['925 纯银', '鏈長 45cm + 5cm 延長鏈', '手工雕刻', '附品牌包装盒'],
    material: '925 纯银',
    stock: 12,
  },
  {
    id: '6',
    name: '細語手链',
    nameEn: 'Whisper Bracelet',
    price: 1680,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe235108?w=600&h=600&fit=crop',
    category: 'bracelets',
    description: '極細鍊條设计，適合單戴或堆疊佩戴。',
    details: ['925 纯银鍍 14K 金', '手圍 15cm + 3cm 延長鏈', '可調節長度', '附品牌包装盒'],
    material: '925 纯银',
    stock: 18,
  },
  {
    id: '7',
    name: '星塵戒指',
    nameEn: 'Stardust Ring',
    price: 1880,
    image: 'https://images.unsplash.com/photo-1603561591411-07133e759b5e?w=600&h=600&fit=crop',
    category: 'rings',
    description: '滿天星设计，指尖的銀河系。',
    details: ['925 纯银', '開口设计', '手工打磨', '附品牌包装盒'],
    material: '925 纯银',
    isNew: true,
    stock: 20,
  },
  {
    id: '8',
    name: '花瓣耳环',
    nameEn: 'Petal Earrings',
    price: 1780,
    image: 'https://images.unsplash.com/photo-1630019821616-afa58a6e4577?w=600&h=600&fit=crop',
    category: 'earrings',
    description: '立體花瓣造型，柔美动人。',
    details: ['925 纯银', '耳針式', '手工塑形', '附品牌包装盒'],
    material: '925 纯银',
    isBestSeller: true,
    stock: 15,
  },
];

export const getProducts = (category?: string) => {
  if (!category || category === 'all') return mockProducts;
  return mockProducts.filter(p => p.category === category);
};

export const getProductById = (id: string) => {
  return mockProducts.find(p => p.id === id);
};

export const getNewProducts = () => mockProducts.filter(p => p.isNew);
export const getBestSellers = () => mockProducts.filter(p => p.isBestSeller);
