import { Logout } from "./Logout"

export const LogoutBtn = () => {
    return(
        <div className="flex flex-col items-center justify-between h-12 py-1 rounded-sm box-border hover:border-b-2 border-teal-700 hover:cursor-pointer" >
            <Logout />
            <button
            className="font-medium"
            style={{ fontSize: "8px" }}
            >
            Logout
            </button>
        </div>
    )
}