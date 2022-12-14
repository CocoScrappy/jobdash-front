import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  // set=>({
  //     userInfo:{},
  //     addUserInfo:(user)=>set((state)=>({userInfo:{...state.userInfo,user}}))
  // })
  persist(
    (set) => ({
      id: -1,
      email: "",
      first_name: "",
      last_name: "",
      role: "",
      cv_id: "",

      // User Info
      addId: (uid) => {
        set(() => ({
          id: uid,
        }));
      },
      addEmail: (uemail) => {
        set(() => ({
          email: uemail,
        }));
      },
      addFirstName: (uFirstName) => {
        set(() => ({
          first_name: uFirstName,
        }));
      },
      addLastName: (uLastName) => {
        set(() => ({
          last_name: uLastName,
        }));
      },
      addRole: (uRole) => {
        set(() => ({
          role: uRole,
        }));
      },
      addCVId: (uCVId) => {
        set(() => ({
          cv_id: uCVId,
        }));
      },


      link:"",

      addLink:(link)=>{
        set(()=>({
          link:link
        }))
      },

    }),
    {
      name: "User_info",
    }
  )
);






export default useStore;
