const materials = [
  {
    title: '925 纯银',
    titleEn: 'Sterling Silver',
    description: '含銀量 92.5%，兼具光澤与耐用性，低敏適合日常佩戴',
    icon: (
      <svg className="w-10 h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: '天然珍珠',
    titleEn: 'Natural Pearl',
    description: '嚴選淡水養殖珍珠，每顆都經過仔細篩選，呈現极致光澤',
    icon: (
      <svg className="w-10 h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: '锆石镶嵌',
    titleEn: 'Zirconia',
    description: '高品质锆石，媲美钻石的闪耀，闪耀动人的璀璨光芒',
    icon: (
      <svg className="w-10 h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: '14K 镀金',
    titleEn: '14K Gold Plated',
    description: '厚實镀金層，不易褪色，長久保持亮麗光澤',
    icon: (
      <svg className="w-10 h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function MaterialSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-16">
          <p className="text-champagne-gold tracking-[0.25em] text-xs mb-3">
            MATERIALS
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-serif text-dark-gray mb-3">
            嚴选材质
          </h2>
          <p className="text-medium-gray text-sm max-w-2xl mx-auto">
            堅持使用高品质材料，確保每件珠宝都能長久陪伴
          </p>
        </div>

        {/* Material Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {materials.map((material, index) => (
            <div
              key={index}
              className="group text-center p-6 lg:p-8 bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center text-champagne-gold mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                {material.icon}
              </div>
              <h3 className="text-lg lg:text-xl font-serif text-dark-gray mb-1">
                {material.title}
              </h3>
              <p className="text-xs text-champagne-gold tracking-wider mb-3 lg:mb-4">
                {material.titleEn}
              </p>
              <p className="text-xs lg:text-sm text-medium-gray leading-relaxed">
                {material.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
