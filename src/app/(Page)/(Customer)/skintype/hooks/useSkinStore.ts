import { create } from "zustand";
import { SkinDto } from "../dto/skin.dto";

interface SkinStore {
  skins: SkinDto[];
  setSkins: (therapists: SkinDto[]) => void;
}

export const useSkinStore = create<SkinStore>((set) => ({
  skins: [],
  setSkins: (skins) => set({ skins }),
}));
