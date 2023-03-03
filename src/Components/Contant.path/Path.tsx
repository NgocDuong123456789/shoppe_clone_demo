export const path = {
  home: '/',
  profile: '/user/profile',
  login: '/login',
  user:'/user',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  historyPurchases: '/user/historyPurchases',
  changePassword: '/user/changePassword',

}

export const sortBy: { createdAt: string; view: string; sold: string; price: string } = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
}

export const order: { asc: string; desc: string } = {
  asc: 'asc',
  desc: 'desc'
}
