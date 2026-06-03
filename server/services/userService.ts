
export const getUsers = () => {
  return [
    { id: 1, name: 'Nguyen Van A' },
    { id: 2, name: 'Tran Thi B' },
  ]
}

export const addUser = (name: string) => {
  return { id: Date.now(), name }
}
