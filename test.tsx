// // src/components/UserProfile.tsx
// import { useUser, useUpdateUser, useDeleteUser } from "../hooks/useApi";
// import { toast } from "sonner";

// interface UserProfileProps {
//   userId: string;
// }

// export function UserProfile({ userId }: UserProfileProps) {
//   const { data: userData, isLoading, error } = useUser(userId);

//   const updateUser = useUpdateUser({
//     onSuccess: () => {
//       toast.success("User updated successfully");
//     },
//   });

//   const deleteUser = useDeleteUser({
//     onSuccess: () => {
//       toast.success("User deleted successfully");
//       // Navigate away or update UI
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!userData) return <div>No user data found</div>;

//   const handleUpdate = async () => {
//     try {
//       await updateUser.mutateAsync({
//         id: userId,
//         data: { name: "New Name" },
//       });
//     } catch (error) {
//       // Error is handled by the interceptor
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteUser.mutateAsync(userId);
//     } catch (error) {
//       // Error is handled by the interceptor
//     }
//   };

//   return (
//     <div>
//       <h1>{userData.data.name}</h1>
//       <p>{userData.data.email}</p>

//       <button onClick={handleUpdate} disabled={updateUser.isPending}>
//         {updateUser.isPending ? "Updating..." : "Update User"}
//       </button>

//       <button onClick={handleDelete} disabled={deleteUser.isPending}>
//         {deleteUser.isPending ? "Deleting..." : "Delete User"}
//       </button>
//     </div>
//   );
// }
