import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:7007/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.isAdmin) {
                        console.log(data);
                        setIsAdmin(data.isAdmin);
                        setIsAdminLoading(false);
                    }
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading];
}

export default useAdmin;