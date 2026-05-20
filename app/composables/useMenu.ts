export type MenuItem = {
  title: string
  thai: string
  description: string
  price: number
  spicy?: number
  featured?: boolean
  img: string
}

export type MenuCategory = 'entrees' | 'plats' | 'desserts' | 'boissons'

export type CategoryMeta = {
  key: MenuCategory
  latin: string
  thai: string
}

export type MenuData = Record<MenuCategory, MenuItem[]>

export function useMenu() {
  const menuData: MenuData = {
    entrees: [
      { title: 'Khao Tom', thai: 'ข้าวต้ม', description: 'Bol de riz au poulet, gingembre et citronnelle', price: 10, spicy: 0, img: 'khao-tom.jpg' },
      { title: 'Satay Gai', thai: 'สะเต๊ะไก่', description: 'Brochettes de poulet grillees, sauce cacahuete', price: 9, spicy: 1, img: 'satay-gai.jpg' },
      { title: 'Nam Prik', thai: 'น้ำพริก', description: 'Sauce chili maison avec crudites', price: 8, spicy: 2, img: 'pad-thai-1.jpg' },
    ],
    plats: [
      { title: 'Pad Thai', thai: 'ผัดไทย', description: 'Nouilles de riz sautees aux crevettes, cacahuetes et lime', price: 15, featured: true, spicy: 1, img: 'pad-thai-1.jpg' },
      { title: 'Pad See Ew', thai: 'ผัดซีอิ๊ว', description: 'Nouilles de riz gelees avec poulet, bok choy', price: 14, featured: true, spicy: 0, img: 'pad-see-ew.jpg' },
      { title: 'Tom Yum', thai: 'ต้มยำ', description: 'Soupe acidulee aux champignons, citronnelle', price: 13, spicy: 2, img: 'tom-yum.jpg' },
      { title: 'Gaeng Daeng', thai: 'แกงแดง', description: 'Curry rouge au poulet, lait de coco', price: 14, spicy: 2, img: 'gaeng-daeng.jpg' },
    ],
    desserts: [
      { title: 'Mango Sticky Rice', thai: 'ข้าวเหนียวมะม่วง', description: 'Riz gluant a la mangue et lait de coco', price: 9, featured: true, img: 'mango-sticky-rice.jpg' },
      { title: 'Kluay Tod', thai: 'กล้วยทอด', description: 'Bananes grillees au sesame', price: 6, img: 'kluay-tod.jpg' },
    ],
    boissons: [
      { title: 'Jus Passion', thai: 'น้ำเสาวรส', description: 'Fait maison, sans sucre ajoute', price: 5, img: 'tom-yum.jpg' },
      { title: 'Jus Mango', thai: 'น้ำมะม่วง', description: 'Mangue fraiche de saison', price: 5, img: 'mango-sticky-rice-1.jpg' },
    ],
  }

  const categories: MenuCategory[] = ['entrees', 'plats', 'desserts', 'boissons']

  const categoryMeta: Record<MenuCategory, CategoryMeta> = {
    entrees: { key: 'entrees', latin: 'Entrées', thai: 'อาหารเรียกน้ำย่อย' },
    plats: { key: 'plats', latin: 'Plats', thai: 'อาหารจานหลัก' },
    desserts: { key: 'desserts', latin: 'Desserts', thai: 'ของหวาน' },
    boissons: { key: 'boissons', latin: 'Boissons', thai: 'เครื่องดื่ม' },
  }

  return { menuData, categories, categoryMeta }
}
