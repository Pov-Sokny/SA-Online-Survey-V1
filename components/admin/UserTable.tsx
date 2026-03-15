// import React from 'react';
// // Import the Table and its Column type (ensure Column is exported in table.tsx)
// //import { Table, type Column } from '@/components/ui/Table'; 
// import { Badge } from '@/components/ui/badge';
// import { Avatar } from '@/components/ui/avatar';
// import { Edit, Trash2 } from 'lucide-react';
// import { Button } from '../ui/button';

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'creator' | 'viewer';
//   status: 'active' | 'inactive' | 'pending';
//   surveysCount: number;
//   lastLogin: string;
//   avatar?: string;
// }

// interface UserTableProps {
//   users: User[];
//   onEdit: (user: User) => void;
//   onDelete: (user: User) => void;
// }

// export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
//   // Explicitly typing the columns array as Column<User>[] fixes the accessorKey error
//   const columns: Column<User>[] = [
//     {
//       header: 'User',
//       cell: (user: User) => (
//         <div className="flex items-center gap-3">
//           <Avatar src={user.avatar} alt={user.name} fallback={user.name[0]} />
//           <div>
//             <div className="font-medium text-gray-900">{user.name}</div>
//             <div className="text-sm text-gray-500">{user.email}</div>
//           </div>
//         </div>
//       )
//     },
//     {
//       header: 'Role',
//       cell: (user: User) => {
//         const colors = {
//           admin: 'bg-purple-100 text-purple-700',
//           creator: 'bg-blue-100 text-blue-700',
//           viewer: 'bg-gray-100 text-gray-700'
//         };
//         return (
//           <Badge className={colors[user.role]}>
//             {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//           </Badge>
//         );
//       }
//     },
//     {
//       header: 'Status',
//       cell: (user: User) => {
//         const colors = {
//           active: 'bg-green-100 text-green-700',
//           inactive: 'bg-red-100 text-red-700',
//           pending: 'bg-yellow-100 text-yellow-700'
//         };
//         return (
//           <Badge className={colors[user.status]}>
//             {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
//           </Badge>
//         );
//       }
//     },
//     {
//       header: 'Surveys',
//       accessorKey: 'surveysCount', // Now type-checked against User
//       className: 'text-center'
//     },
//     {
//       header: 'Last Login',
//       accessorKey: 'lastLogin' // Now type-checked against User
//     },
//     {
//       header: 'Actions',
//       cell: (user: User) => (
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="sm" onClick={(e) => {
//             e.stopPropagation(); 
//             onEdit(user);
//           }}>
//             <Edit className="w-4 h-4 text-gray-500" />
//           </Button>
//           <Button variant="ghost" size="sm" onClick={(e) => {
//             e.stopPropagation(); 
//             onDelete(user);
//           }}>
//             <Trash2 className="w-4 h-4 text-red-500" />
//           </Button>
//         </div>
//       )
//     }
//   ];

//   return <Table data={users} columns={columns} onRowClick={onEdit} />;
// }