import { create } from 'zustand'
import { persist, } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set,) => ({
      credits: 0,
      userData: {},
      token: "",
      setCredit: (val) => set((state) => ({ credits: val })),
      setUserData: (val) => set((state) => ({ userData: val })),
      setToken: (val) => set((state) => ({ token: val })),
    }),
    {
      name: 'dister-data',
    }
  )
)


export default useStore;