import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'

//szerve portja
const PORT = 3000

const root = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.listen(PORT,()=>{
    console.log("server is listen on port 3000")
})

app.get("/hi", (req,res) =>{
    res.send("Hi, there!")
})
//3 endpoint
app.get("/express", (req,res) =>{
    res.send("Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült.")
})

app.get("/greeting", (req,res) =>{
    res.send("Hello,  Csatai Martin")
})

app.get("/nodejs", (req,res) =>{
    res.send("A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.")
})

//statikus elemek könyvtárazása
app.use(express.static(path.join(root, 'public')))

//index.html kiszolgalasa
app.get("/", (req, res) => res.sendFile(path.join(root, 'public', 'index.html')))


//4. feladat

const users = [
    { id: "1",  name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Sam Johnson" },
  ]
//get 

app.get("/api/users", (req, res) => res.status(200).json(users))

//get id

    app.get("/api/users/:id", (req, res) => {
        const id = req.params.id;
        const user = users.find(e => e.id === id);
    
        if (!user) {
            return res.status(404).json({ message: "A felhasználó nem található" });
        }
    
        res.status(200).json(user);
    });
//uj felhasznalo

app.use(express.json());
app.post("/api/users", (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "Az ID és a név megadása kötelező" });
    }

    users.push({ id, name });
    res.status(201).json({ message: "Felhasználó sikeresen létrehozva" });
});
//szerkesztes

app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    const user = users.find(e => e.id === id);

    if (!user) {
        return res.status(404).json({ message: "A felhasználó nem található" });
    }

    if (!name) {
        return res.status(400).json({ message: "A név megadása kötelező" });
    }

    user.name = name;
    res.status(200).json({ message: "Felhasználó sikeresen frissítve" });
});

//torles
app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "A felhasználó nem található" });
    }

    users.splice(index, 1);
    res.status(204).send();
});
