const userProviders = {
  NUMBER: 'number',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

const userRoles = [
  'Super Admin',
  'Admin',
  'Seller',
  'Delivery Partner'
]

const userStatus = {
  ACTIVE: 'active',
  PENDING: 'pending',
  BLOCKED: 'blocked',
}

const userGender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHERS: 'others',
}

module.exports = {
  userRoles,
  userProviders,
  userStatus,
  userGender
};