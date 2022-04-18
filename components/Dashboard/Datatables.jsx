import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../state/allState";
import _ from "lodash";

export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  }, [setUser]);

  function handleDeleteButton(item) {
    let newUser = [...user];
    _.remove(newUser, (e) => e.id === item);
    setUser(newUser);

    // start optimistic update
  }

  if (err) return <p>Error happen {err}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Empty list</p>;

  if (user)
    return (
      <div>
        <table className="table table-vcenter card-table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>username</th>
              <th>email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDeleteButton(item.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
