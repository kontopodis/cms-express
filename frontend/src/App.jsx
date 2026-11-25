import { useEffect, useState } from "react";
import { Routes, Route, Navigate, NavLink, useNavigate, useParams, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, FileText, Users, LogOut, Plus, Menu, Search } from "lucide-react";
import axios from "axios"
import e from "cors";
const initialArticles = [
  { id: "1", title: "Getting started with our platform", category: "Guides", status: "Published", author: "Alex Morgan" },
  { id: "2", title: "What’s new this month", category: "Updates", status: "Draft", author: "Jamie Lee" }
];
const initialUsers = [
  { id: "1", name: "Alex Morgan", email: "alex@example.com", role: "Administrator" },
  { id: "2", name: "Jamie Lee", email: "jamie@example.com", role: "Editor" }
];



function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1A_qwerty");
  const navigate = useNavigate();
  function submit(e) { e.preventDefault(); onLogin(email, password); navigate("/articles"); }
  return <main className="login-page"><form className="login-card" onSubmit={submit}>
    <div className="brand-mark">A</div><p className="eyebrow">WELCOME BACK</p><h1>Sign in to your account</h1>
    <p className="muted">Use your credentials to access the admin panel.</p>
    <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <button className="button primary full">Sign in</button>
    <p className="hint">Demo only — connect your authentication API before production.</p>
  </form></main>;
}

function Shell({ onLogout , user}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log(user)
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="brand"><span className="brand-mark small">A</span><span>Admin<span className="brand-light">Panel</span></span></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav>
        <NavLink to="/articles" onClick={() => setMobileOpen(false)}><FileText size={18} /> Articles</NavLink>
        <NavLink to="/users" onClick={() => setMobileOpen(false)}><Users size={18} /> Users</NavLink>
      </nav>
      <button className="logout" onClick={onLogout}><LogOut size={18} /> Sign out</button>
    </aside>
    <section className="main-area">
      <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu /></button><div className="breadcrumb">Workspace <span>/</span> Administration</div><div className="profile"><div className="avatar">AD</div><div><b>{user.username}</b><small>{capitalizeFirstLetter(user.role)}</small></div></div></header>
      <main className="content"><Outlet /></main>
    </section>
  </div>;
}

function PageHeading({ title, subtitle, action }) {
  return <div className="page-heading"><div><p className="eyebrow">MANAGEMENT</p><h1>{title}</h1><p className="muted">{subtitle}</p></div>{action}</div>;
}

function Articles({ articles, token, getArticles }) {
  const [query, setQuery] = useState("");

  const filtered = articles.filter((a) => { return (a.title.toLowerCase().includes(query.toLowerCase())) });
  const deleteArticle = (id) => {
    axios.defaults.headers = { token: token }
    const body = { id: id }
    console.log(body)
    axios.delete("http://localhost:3000/admin/article", { data: body })
      .then((res) => {
        console.log(res)
        getArticles()
      }).catch((err) => {
        console.log(err)
      })
  }
  return <><PageHeading title="Articles" subtitle="Create, edit and manage your content." action={<Link className="button primary" to="/articles/new"><Plus size={17} /> Add article</Link>} />
    <div className="toolbar"><div className="search"><Search size={17} /><input placeholder="Search articles..." value={query} onChange={e => setQuery(e.target.value)} /></div><span className="muted">{filtered.length} articles</span></div>
    <div className="table-card"><table><thead><tr><th>Title</th><th>Author</th><th></th></tr></thead><tbody>
      {filtered.map(a => <tr key={a.id}><td><b>{a.title}</b><small>Updated recently</small></td><td>{a.authorId}</td><td><Link className="text-link" to={`/articles/${a.id}/edit`}>Edit</Link></td><td><Link className="text-link" onClick={() => { deleteArticle(a.id) }}>Delete</Link></td></tr>)}
      {!filtered.length && <tr><td colSpan="5" className="empty">No articles found.</td></tr>}
    </tbody></table></div>
  </>;
}

function ArticleForm({ articles, token, getArticles, usecase }) {
  const { id } = useParams(), navigate = useNavigate();
  const existing = articles.find(a => a.id === id);
  const [title, setTitle] = useState(existing?.title || "");
  const [body, setBody] = useState(existing?.content);

  const newArticle = (n) => {
    console.log(token)
    const article = {

      title: title,
      content: body,
      imageUrl: "some/url/somewhere",
    }
    axios.defaults.headers = { token: token }
    axios.post("http://localhost:3000/admin/article", article
    ).then((res) => {
      getArticles()
    })

  }

  const updateArticle = (n) => {
    existing.content = body
    existing.title = title
    console.log(token)
    axios.defaults.headers = { token: token }
    axios.patch("http://localhost:3000/admin/article", existing
    ).then((res) => {
      getArticles()
    }).catch((err) => {
      console.log("Patch problem")
      console.log(err)
      getArticles()
    })

  }
  function submit(e) {
    e.preventDefault();
    if (usecase == "new") { newArticle() }
    else if (usecase == "update") { updateArticle() }
    navigate("/articles");
  }
  if (id && !existing) return <NotFound />;
  return <><PageHeading title={id ? "Edit article" : "Add article"} subtitle="Fill in the details below." />
    <form className="form-card" onSubmit={submit}>
      <label>Article title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter article title" required /></label>
      <label>Content<textarea rows="9" value={body} onChange={e => setBody(e.target.value)} placeholder="Write your article content..." /></label>
      <div className="form-actions"><Link className="button secondary" to="/articles">Cancel</Link><button className="button primary">{id ? "Save changes" : "Create article"}</button></div>
    </form>
  </>;
}

function UsersPage({ users, getUsers }) {
  if (users === initialUsers) {
    getUsers().then(() => {
      console.log("got Users")
    })
  }
  const deleteUser = async (email)=>{ 
    await axios.delete("http://localhost:3000/admin/user",{data:{email:email}}).then((res)=>{
      console.log(res)
    getUsers()}
    )
  }


  return <><PageHeading title="Users" subtitle="Manage people and their access." action={<Link className="button primary" to="/users/new"><Plus size={17} /> Add user</Link>} />
    <div className="table-card"><table><thead><tr><th>Username</th><th>Email</th><th>Role</th><th></th></tr></thead><tbody>
      {users.map(u => <tr key={u.id}><td><b>{u.username}</b></td><td>{u.email}</td><td><span className="badge neutral">{u.role}</span></td><td><Link className="text-link" to={`/users/${u.id}/edit`}>Edit</Link></td><td><Link className="text-link" to={`/users/`}  onClick={()=>{deleteUser(u.email)}}>Delete</Link></td></tr>)}
    </tbody></table></div>
  </>;
}

function NewUserForm({ getUsers }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Editor");
  const navigate = useNavigate();
  const createUser = async (payload) =>{
    await axios.post("http://localhost:3000/admin/user", payload).then((res)=>{ 
      console.log(res)
      getUsers()
    })
  }
  function submit(e) { e.preventDefault(); 
    const user = { username: name, email: email, password: password }; 
    createUser(user)
    getUsers()
    navigate("/users"); }  
  return <><PageHeading title={"Add user"} subtitle="Set up a user profile and permissions." />
    <form className="form-card" onSubmit={submit}>
      <label>Username<input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Agnostos X" /></label>
      <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="onomataki@paradeigma.gr" /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <div className="form-actions"><Link className="button secondary" to="/users">Cancel</Link><button className="button primary">{"Create user"}</button></div>
    </form>
  </>;
}
function EditUserForm({ users, token, getUsers}) {
  const { id } = useParams(), navigate = useNavigate(), existing = users.find(u => u.id === id);
  const [name, setName] = useState(existing?.username || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [password, setPassword] = useState(existing?.password || "");
  const [role, setRole] = useState(existing?.role || "Reader");
    console.log(existing)
  return <><PageHeading title="Edit user" subtitle="Set up a user's profile and permissions." />
<form className="form-card">
  <label>Username<input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Taylor Smith" /></label>
  <div className="form-actions"><button className="button primary" onClick={async (e)=>{
      e.preventDefault()
      axios.defaults.headers = { token: token }
      await axios.patch("http://localhost:3000/admin/user", {email:email, case: "username", value:name}).then((res)=>{
        console.log(res)
        getUsers()
        navigate("/users")
      })
  }}
  >Save changes</button></div>
</form>
<form className="form-card">
  <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" /></label>
  <div className="form-actions"><button className="button primary"onClick={async (e)=>{
      e.preventDefault()
      axios.defaults.headers = { token: token }
      await axios.patch("http://localhost:3000/admin/user", {email:email, case: "email", value:email}).then((res)=>{
        console.log(res)
        getUsers()
        navigate("/users")
      })
  }}>Save changes</button></div>
</form>
<form className="form-card"><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
</label>
 <div className="form-actions"><button className="button primary"onClick={async (e)=>{
      e.preventDefault()
      axios.defaults.headers = { token: token }
      await axios.patch("http://localhost:3000/admin/user", {email:email, case: "password", value:password}).then((res)=>{
        console.log(res)
        getUsers()
        navigate("/users")
      })
  }}>Save changes</button></div>
</form>      
<form className="form-card">
  <label>Role<select value={capitalizeFirstLetter(role)} onChange={e => setRole(e.target.value)}><option>Admin</option><option>Moderator</option><option>Reader</option></select></label>
      <div className="form-actions"><button className="button primary"onClick={async (e)=>{
      e.preventDefault()
      axios.defaults.headers = { token: token }
      await axios.patch("http://localhost:3000/admin/user", {email:email, case: "to"+role, value:role}).then((res)=>{
        console.log(res)
        console.log("to"+role)
        getUsers()
        navigate("/users")
      })
  }}>Save Changes</button></div>
  </form>
  <Link className="button secondary" to="/users">Cancel</Link>      
      

  </>;
}
function NotFound() { return <div className="form-card"><h2>Record not found</h2><Link to="/articles" className="text-link">Back to articles</Link></div> }

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("")
  const [articles, setArticles] = useState(initialArticles);
  const [users, setUsers] = useState(initialUsers);
  const [email,setEmail] = useState("")
  const [user,setUser] = useState({})

  const getArticles = async () => {
    await axios.get("http://localhost:3000/articles").then((res) => {
      console.log(JSON.parse(res.request.response))
      setArticles(JSON.parse(res.request.response))

    })
  }
  const getUsers = async () => {
    axios.defaults.headers = { token: token }
    await axios.get("http://localhost:3000/admin/users").then((res) => {
      console.log(JSON.parse(res.request.response))
      setUsers(JSON.parse(res.request.response))

    })
    users.map(u=>{
      if (u.email === email){
        setUser(u)
      }
    })
  }
  const connectApi = (email, password) => {
    setEmail(email)
    axios.post("http://localhost:3000/admin/login", {
      password: password,
      email: email,
    }).then((r) => {
      console.log(r)
      setToken(r.data.token)
      setUser(r.data.user)


      getArticles().then(() => {
        console.log("got Articles")

      })



      setAuthenticated(true)


    }).catch((err) => {
      console.log(err)
    })

  }

const logOut= ()=>{
setAuthenticated(false)
setUser([])
setUsers(initialUsers)
setToken("")
console.log("Logged out")
}

  return <Routes>
    <Route path="/" element={authenticated ? <Navigate to="/articles" /> : <Login onLogin={connectApi} />} />
    <Route element={authenticated ? <Shell onLogout={logOut} user={user}/> : <Navigate to="/" />}>
      <Route path="/articles" element={<Articles articles={articles} token={token} getArticles={getArticles} />} />
      <Route path="/articles/new" element={<ArticleForm articles={articles} token={token} getArticles={getArticles} usecase="new" />} />
      <Route path="/articles/:id/edit" element={<ArticleForm articles={articles} token={token} getArticles={getArticles} usecase="update" />} />
      <Route path="/users" element={<UsersPage users={users} setUsers={setUsers} token={token} getUsers={getUsers} />} />
      <Route path="/users/new" element={<NewUserForm getUsers={getUsers} />} />
      <Route path="/users/:id/edit" element={<EditUserForm users = {users} getUsers={getUsers} token={token} />} />
    </Route>
    <Route path="*" element={<Navigate to={authenticated ? "/articles" : "/"} />} />
  </Routes>;
}