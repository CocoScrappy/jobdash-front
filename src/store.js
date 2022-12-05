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
      addCVId: (cvId) => {
        set(() => ({
          cv_id: cvId,
        }));
      },


      jpid: -1,
      title: "",
      logo_url: "",
      location: "",
      description: "",
      date_created: "",
      remote_option: "",
      employer_id: -1,
      company_name: "",

      // Job Post (jp) Info
      addJpId: (jpid) => {
        set(() => ({
          jpid: jpid,
        }));
      },
      addTitle: (jpTitle) => {
        set(() => ({
          title: jpTitle,
        }));
      },
      addLogoUrl: (jpLogoUrl) => {
        set(() => ({
          logo_url: jpLogoUrl,
        }));
      },
      addLocation: (jpLocation) => {
        set(() => ({
          location: jpLocation,
        }));
      },
      addDescription: (jpDescription) => {
        set(() => ({
          description: jpDescription,
        }));
      },
      addDateCreated: (jpDateCreated) => {
        set(() => ({
          date_created: jpDateCreated,
        }));
      },
      addRemoteOption: (jpRemoteOption) => {
        set(() => ({
          remote_option: jpRemoteOption,
        }));
      },
      addEmployerId: (jpEmployerId) => {
        set(() => ({
          employer_id: jpEmployerId,
        }));
      },
      addCompanyName: (jpCompanyName) => {
        set(() => ({
          company_name: jpCompanyName,
        }));
      },
    


    }),
    {
      name: "User_info",
    }
  )
);






export default useStore;
