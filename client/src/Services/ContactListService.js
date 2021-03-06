import { v4 as uuidv4 } from "uuid";

export default class ContactListService {
  DB_URL = "http://localhost:8000/api/";

  async updateData() {
    const List = await fetch(this.DB_URL + "contacts")
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        if (!data.hasOwnProperty('contacts')) {
          return {
            List: [],
          };
        } else {
          return {
            List: data.contacts,
          };
        }
      })
      .catch((err) => console.log(err));
    return List;
  }

    async onSaveData(newContact) {
      console.log("onSaveData", newContact)
      await fetch(this.DB_URL + "contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });
    }

  //   onStatusChange = (id) => {
  //     const index = this.state.List.findIndex((elem) => elem.id === id);
  //     const tmpList = this.state.List.slice();
  //     switch (tmpList[index].status) {
  //       case "Active":
  //         tmpList[index].status = "Inactive";
  //         break;
  //       case "Inactive":
  //         tmpList[index].status = "Pending";
  //         break;
  //       case "Pending":
  //         tmpList[index].status = "Banned";
  //         break;
  //       case "Banned":
  //         tmpList[index].status = "Active";
  //     }
  //     this.onSaveData(tmpList);
  //     this.setState({
  //       List: tmpList,
  //     });
  //   };

    onCreate = (contact) => {
      const { name, role, avatar, status, email, gender } = contact;
      let newContact = {
        name: name,
        role: role,
        avatar: avatar,
        created: Date.now(),
        status: status,
        email: email,
        gender: gender,
      };

      this.onSaveData(newContact);
      this.updateData();
    };

  //   onDelete = (id) => {
  //     const index = this.state.List.findIndex((elem) => elem.id === id);
  //     const partOne = this.state.List.slice(0, index);
  //     const partTwo = this.state.List.slice(index + 1);
  //     const newList = [...partOne, ...partTwo];

  //     this.onSaveData(newList);
  //     this.setState(() => {
  //       return {
  //         List: newList,
  //       };
  //     });
  //   };

     async onEdit(id) {
      const singleConatct = await fetch(this.DB_URL + `edit/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        }).then(result => {
          return result.json();
        }).then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
        return singleConatct;
    };

  //   onEditCurrentContact = (
  //     name,
  //     role,
  //     avatar,
  //     status,
  //     email,
  //     gender,
  //     created,
  //     id
  //   ) => {
  //     const index = this.state.List.findIndex((elem) => elem.id === id);
  //     let newContact = {
  //       id: id,
  //       name: name,
  //       role: role,
  //       avatar: avatar,
  //       created: created,
  //       status: status,
  //       email: email,
  //       gender: gender,
  //     };

  //     const partOne = this.state.List.slice(0, index);
  //     const partTwo = this.state.List.slice(index + 1);
  //     const newList = [...partOne, newContact, ...partTwo];

  //     this.onSaveData(newList);
  //     this.setState({
  //       List: newList,
  //     });
  //   };
}
