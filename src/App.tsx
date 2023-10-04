import { SetStateAction } from "react";
import "react-bootstrap";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  // const [category, setCategory] = useState("");
  // const ref = useRef<HTMLInputElement>(null);

  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService
      .delete(user.id)
      .catch((err: { message: SetStateAction<string> }) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];

    const newUser = {
      id: 0,
      name: "Mosh",
    };
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then((res: { data: User }) => setUsers([res.data, ...users]))
      .catch((err: { message: SetStateAction<string> }) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];

    const updatedUser = {
      ...user,
      name: "Moshix",
    };
    setUsers(users.map((x) => (x.id == user.id ? updatedUser : x)));

    userService
      .update(updatedUser)
      .then((res: { data: User }) => setUsers([res.data, ...users]))
      .catch((err: { message: SetStateAction<string> }) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error != "" && <p>{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <div>
        {/* <select
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          {users.map((user) => (
            <option value={user.id}>{user.name} </option>
          ))}
        </select> */}
        {/* <input ref={ref} type="text" className="form-control"></input> */}
        <ul className="list-group">
          <button
            className="btn btn-outline-danger justify-end"
            onClick={() => addUser()}
          >
            Add
          </button>
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between"
            >
              {user.name}{" "}
              <button
                className="btn btn-outline-danger"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/* <ProductList category={category} /> */}
      </div>
    </>
  );
}

export default App;
