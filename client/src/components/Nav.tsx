
function NavComponent() {
  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">
            Task Manager
            </div>
            <ul className="flex space-x-4">
                <li>
                    <a href="/" className="text-gray-300 hover:text-white">Home</a>
                </li>
                <li>
                    <a href="/newTask" className="text-gray-300 hover:text-white">Create Tasks</a>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default NavComponent;
