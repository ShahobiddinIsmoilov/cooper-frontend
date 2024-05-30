// import { BsThreeDots } from "react-icons/bs";
// import { Slide, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import { PostProps } from "../../interfaces/postProps";
// import { useAuthContext } from "../../contexts/AuthContext";
// import { useLanguage } from "../../contexts/LanguageContext";
// import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
// import { FaRegFlag } from "react-icons/fa6";
// import useCredentials from "../../services/useCredentials";
// import "@szhsin/react-menu/dist/index.css";
// import "@szhsin/react-menu/dist/transitions/slide.css";
// import "./content-menu.css";

// export default function CommentOptions({
//   comment,
//   bg,
// }: {
//   comment: PostProps;
//   bg: string;
// }) {
//   const api = useCredentials();
//   const { user } = useAuthContext();
//   const { language } = useLanguage();
//   const navigate = useNavigate();

//   const notifyNotAuthenticated = () =>
//     toast.error(content_options.toast.unauthorized[language], {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       transition: Slide,
//     });

//   // function handleEdit() {
//   //   navigate(`/c/${comment.community_link}/comment/${comment.permalink}/edit`);
//   // }

//   // function handleDelete() {}

//   // function handleReport() {}

//   return (
//     <Menu
//       menuButton={
//         <MenuButton
//           className={`hover:bg-dark-${bg} rounded-full text-white/50 hover:text-white flex p-[10px] cursor-pointer items-center`}
//         >
//           <BsThreeDots />
//         </MenuButton>
//       }
//       align="end"
//       menuStyle={{
//         backgroundColor: "#191919",
//         borderRadius: "12px",
//         zIndex: 2,
//       }}
//     >
//       {user?.user_id === comment.user ? (
//         <>
//           <MenuItem
//             // onClick={handleEdit}
//             className="my-2 content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white"
//           >
//             <FaEdit size={20} />
//             <span>{content_options.menu_items.edit[language]}</span>
//           </MenuItem>
//           <MenuItem className="mt-2 content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white">
//             <FaRegTrashAlt size={20} />
//             <span>{content_options.menu_items.delete[language]}</span>
//           </MenuItem>
//         </>
//       ) : (
//         <MenuItem className="mt-2 content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white">
//           <FaRegFlag size={20} />
//           <span>{content_options.menu_items.report[language]}</span>
//         </MenuItem>
//       )}
//     </Menu>
//   );
// }

// const content_options = {
//   menu_items: {
//     save: {
//       uz: "Saqlash",
//       en: "Save",
//       ru: "(неопределенный)",
//     },
//     remove_save: {
//       uz: "Saqlanganlardan olib tashlash",
//       en: "Remove from saved",
//       ru: "(неопределенный)",
//     },
//     edit: {
//       uz: "Tahrirlash",
//       en: "Edit",
//       ru: "Edit",
//     },
//     delete: {
//       uz: "O'chirish",
//       en: "Delete",
//       ru: "Delete",
//     },
//     report: {
//       uz: "Shikoyat qilish",
//       en: "Report",
//       ru: "(неопределенный)",
//     },
//   },
//   toast: {
//     saved: {
//       uz: "Post saqlanganlarga qo'shildi",
//       en: "Post has been added to your saved list",
//       ru: "Post has been added to your saved list",
//     },
//     unsaved: {
//       uz: "Post saqlanganlardan olib tashlandi",
//       en: "Post has been removed from your saved list",
//       ru: "Post has been removed from your saved list",
//     },
//     unauthorized: {
//       uz: "Postni saqlash uchun hisobingizga kiring",
//       en: "You must be logged in to save posts",
//       ru: "You must be logged in to save posts",
//     },
//   },
// };
