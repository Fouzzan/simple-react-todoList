import todo from "../assets/todo_icon.png"


export default function Navbar()
{
    return(
        <nav className="bg-red-400">
            <ol className="flex justify-between gap-x-50 px-10 py-1 items-center">
                <li><img src={todo} className="w-8"/></li>
                <li>
                    <input type="text" placeholder="Search tasks" className="rounded-full my-2 p-1 bg-red-200" />
                </li>
                <li>Account</li>
               
                
            </ol>
        </nav>
    )
}