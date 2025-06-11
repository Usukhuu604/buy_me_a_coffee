// "use client";

// import { useFormState } from "react-dom";
// import { createProfile } from "../actions/createProfile";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const initialState = {
//   message: "",
//   ZodError: {
//     name: [],
//     about: [],
//     socialMediaURL: [],
//     avatarImage: [],
//     backgroundImage: [],
//   },
// };

// export default function OnboardingPage() {
//   const [state, formAction] = useFormState(createProfile, initialState);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Complete Your Profile</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">Tell us a bit about yourself</p>
//         </div>

//         <form className="mt-8 space-y-6" action={formAction}>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="name">Full Name</Label>
//               <Input id="name" name="name" type="text" required className="mt-1" placeholder="John Doe" />
//               {state?.ZodError?.name && <p className="mt-1 text-sm text-red-600">{state.ZodError.name}</p>}
//             </div>

//             <div>
//               <Label htmlFor="about">About You</Label>

//               {state?.ZodError?.about && <p className="mt-1 text-sm text-red-600">{state.ZodError.about}</p>}
//             </div>

//             <div>
//               <Label htmlFor="socialMediaURL">Social Media URL</Label>
//               <Input
//                 id="socialMediaURL"
//                 name="socialMediaURL"
//                 type="url"
//                 required
//                 className="mt-1"
//                 placeholder="https://twitter.com/yourusername"
//               />
//               {state?.ZodError?.socialMediaURL && (
//                 <p className="mt-1 text-sm text-red-600">{state.ZodError.socialMediaURL}</p>
//               )}
//             </div>

//             {/* <div>
//               <Label htmlFor="avatarImage">Profile Picture URL</Label>
//               <Input
//                 id="avatarImage"
//                 name="avatarImage"
//                 type="url"
//                 required
//                 className="mt-1"
//                 placeholder="https://example.com/your-image.jpg"
//               />
//               {state?.ZodError?.avatarImage && (
//                 <p className="mt-1 text-sm text-red-600">{state.ZodError.avatarImage}</p>
//               )}
//             </div> */}

//             {/* <div>
//               <Label htmlFor="backgroundImage">Background Image URL</Label>
//               <Input
//                 id="backgroundImage"
//                 name="backgroundImage"
//                 type="url"
//                 className="mt-1"
//                 placeholder="https://example.com/your-background.jpg"
//               />
//             </div> */}
//           </div>

//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//             Complete Profile
//           </Button>

//           {state?.message && <p className="mt-2 text-center text-sm text-red-600">{state.message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
