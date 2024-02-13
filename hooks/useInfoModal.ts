import { create } from "zustand";

export interface ModalStoreInterface{
    movieId : string;
    isOpen:boolean;
    openModal: {movieId : string} =>void;
    classModa : ()=>void;
};

const useInfoModal = create<ModalStoreInterface>( (set) =>({
movieId : undefined , 
isOpen : false,
openModal : (movieId : string) => set({})
}))