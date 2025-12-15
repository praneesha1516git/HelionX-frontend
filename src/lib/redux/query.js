import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =  import.meta.env.VITE_BACKEND_URL + "/api";

// Define a service using a base URL and expected endpoints

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl  , prepareHeaders: async (headers) => {
    //window.clerk means accessing the Clerk instance from the global window object
 
    const clerk = window.Clerk;
    if (clerk) {
      console.log("Clerk instance found.");
       const token = await clerk.session.getToken();

       if(token) {
        // Set the Authorization header with the Clerk token
         headers.set("Authorization", `Bearer ${token}`);
         console.log("Authorization header set in query.js");
       }
    }

    return headers;
}}),


  endpoints: (build) => ({
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({id, groupBy , limit}) => `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    
    // New endpoint to get solar unit by Clerk user ID
   getSolarUnitForUser : build.query ({
      query : () => `/solar-units/me`,
   }),
 
   // New endpoint to get all solar units
   getSolarUnits : build.query ({
    query : () => `/solar-units`,
  }),

  //endpoint to get solar unit by ID
  getSolarUnitById : build.query ({
    query : (id) => `/solar-units/${id}`,
  }),


  createSolarUnit : build.mutation ({
    query : (data) => ({
      url: '/solar-units',
      method: 'POST',
      body: data,
    })
  }),

  editSolarUnit : build.mutation ({
    query : ({id , data}) => ({
      url: `/solar-units/${id}`,
      method: 'PUT',
      body: data,
    })
  }),

    getAllUsers : build.query ({
      query : () => `/users`,
    }),

  }),
});






// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetEnergyGenerationRecordsBySolarUnitQuery , 
  useGetSolarUnitForUserQuery ,
   useGetSolarUnitsQuery,
   useGetSolarUnitByIdQuery,
   useCreateSolarUnitMutation,
   useEditSolarUnitMutation,
    useGetAllUsersQuery,
   } = api;