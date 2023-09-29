import { SetStateAction, useEffect, useRef, useState } from "react";
import "react-bootstrap";
import userService, { User, CanceledError } from "./services/user-service";

function App() {
  // const [category, setCategory] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  // const ref = useRef<HTMLInputElement>(null);

  //afterRender Top level
  useEffect(() => {
    //get ->promise->res/err
    // const fetchUser = async () => {
    //   try {
    //     const res = await axios.get<User[]>(
    //       "https://jsonplaceholder.typicode.com/users"
    //     );
    //     setError("");
    //     setUsers(res.data);
    //   } catch (error) {
    //     setError((error as AxiosError).message);
    //   }
    // };
    // fetchUser();

    const { request, cancel } = userService.getAllUsers();

    request
      .then((res: { data: SetStateAction<User[]> }) => {
        setError("");
        setUsers(res.data);
      })
      .catch((err: { message: SetStateAction<string> }) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => cancel();
    //Side effect
    // if (ref.current) ref.current.focus();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService
      .deleteUser(user.id)
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
      .addUser(newUser)
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
      .updateUser(updatedUser)
      .then((res: { data: User }) => setUsers([res.data, ...users]))
      .catch((err: { message: SetStateAction<string> }) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error != "" && <p>{error}</p>}
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
