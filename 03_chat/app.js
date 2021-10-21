const socketio =  require("@feathersjs/socketio")
const feathers =  require("@feathersjs/feathers")
const express = require("@feathersjs/express")


class MessageService{
    constructor(){ // connect to database
        this.messages=[]
    }

    async find(){
        return this.messages
    }

    async get(id){
        return this.messages[id]
    }

    async create(data){
        const message = {
            id: this.messages.length,
            text: data.text,
        };
        this.messages.push(message);
        return message;
    }
    async remove(index){
        //erro pop só tira o último cara
        const message = this.messages.pop(index)
        return message

        /*procurar o id, retornar o objeto todo sem o id
        meuJSON = meuJSON.filter(function(jsonObject) {
            return jsonObject[chave] != valor;
        });
        this.messages = removerPela(index,'id', this.messages)*/
        //this.messages[index]
    
        /*
        let newMessage
        this.messages.forEach(element => {
            if(element.id != index)
                newMessage.push(element)
        });

        this.messages = newMessage
        return newMessage*/
    }



    //find    GET   /messages
    //get    GET    /messages/1
    //create POST   /messages
    //update PUT    /messages/1
    //patch  PATCH  /messages/1
    //remove DELETE /messages/1
}




/*//expor service a uma api, expor a api em web sockets parar ter uma aplicação em tempo real*/
const app = express(feathers())
app.use(express.static(__dirname)) //midleware
app.configure(express.rest())
app.configure(socketio())
app.on("connection",(connection)=>{//socket channels
    app.channel("everybody").join(connection)
})
app.publish(()=> app.channel("everybody"))
app.use("/messages", new MessageService());


async function main(){
    await app.service("messages").create({text: "Hello"})
   // await app.service("messages").create({text: "World"})
   // const messages = await app.service("messages").find()
  //  console.log("All Messages", messages);
}
main()

app.listen(3030).on("listening", () =>{
    console.log("Feathers running in http://localhost:3030/")
})

/*//troca de mensagens backend
const app = feathers()
async function main(){
    await app.service("messages").create({text: "Hello"})
    await app.service("messages").create({text: "World"})
    const messages = await app.service("messages").find()
    console.log("All Messages", messages);
}
main()*/
//26:51
/*
const app = express()
app.use(express.static(__dirname))
app.listen(3030).on("listening", () =>{
    console.log("Feathers running in http://localhost:3030/")
})*/
