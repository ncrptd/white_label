/* eslint-disable react/prop-types */

function RequiresRole({ children }) {
    const user = localStorage.getItem('user');
    let role;
    if (user) {
        role = JSON.parse(user).result.role;
    }

    return (
        role === 'admin' ? (children) : <h2 className="mt-6 text-center text-red-500 font-bold text-4xl">Unauthorized</h2>

    )
}

export default RequiresRole