export enum TypeSubject {
  all,
  permission,
  role,
  user,
  template,
  tenant,
  branch,
  address,
  radio,
  habit,
  activities,
  physicalRecord,
  plan,
}
export enum TypeAction {
  leer,
  crear,
  editar,
  eliminar,
}

export enum AuthProviderType {
  email = 'email',
  google = 'google',
  facebook = 'facebook',
  apple = 'apple',
  phone = 'phone',
}