import { create } from 'zustand'

const useStore = create((set) => ({
   characters: [],
   starships: [],
   places: []

}))