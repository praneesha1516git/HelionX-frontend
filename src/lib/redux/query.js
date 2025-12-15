import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =  "https://helionx-back-end-praneesha.onrender.com/api";

// Define a service using a base URL and expected endpoints

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      // Access Clerk instance from window (if present) and attempt to attach token.
      // Add logging to help diagnose server 500 errors caused by missing/invalid auth.
      try {
        const clerk = window?.Clerk;
        if (clerk) {
          console.log("Clerk instance found in prepareHeaders.");
          // getToken may throw or return undefined; wrap in try/catch
          let token;
          try {
            token = await clerk.session.getToken();
          } catch (e) {
            console.warn("Error while getting Clerk token:", e);
          }

          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            console.log("Attached Authorization header (Bearer token).");
          } else {
            console.log("No Clerk token available — Authorization header not set.");
          }
        } else {
          console.log("No Clerk instance on window — skipping auth header.");
        }
      } catch (err) {
        // Ensure prepareHeaders never throws and breaks requests
        console.error("prepareHeaders error:", err);
      }

      return headers;
    },
  }),


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