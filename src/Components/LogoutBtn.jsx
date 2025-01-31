import { Logout } from "./Logout"

export const LogoutBtn = () => {
    return(
        <div className="flex flex-col justify-center h-12 pb-1 rounded-sm box-border hover:border-b-2 border-teal-700 hover:cursor-pointer" >
            <div className="flex justify-center h-full p-0 m-0">
                <Logout />
            </div>
            <button
            className="font-medium"
            style={{ fontSize: "8px" }}
            >
            Logout
            </button>
        </div>
    )
}