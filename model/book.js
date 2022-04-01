module.exports = {
    getBooks: function(connection, func){
        connection.query("SELECT * FROM book",func);
    },

    insertBook : function(connection, datas,files, func){
        connection.query("INSERT INTO book (title , image) VALUES (?,?) ",[datas.title, files.filename], func);
    },

    returnDataByID : function(connection, id, func){
        connection.query("SELECT * FROM book WHERE id=?", [id] , func);
    },

    deleteBook : function(connection, id, func){
        connection.query("DELETE FROM book WHERE id=?", [id], func);
    },

    updateBook : function(connection, datas, func){
        connection.query("UPDATE book SET title=? WHERE id =? ",[datas.title, datas.id], func);
    },

    updateFile : function(connection, datas, file , func){
        connection.query("UPDATE book SET image=? WHERE id =? ",[ file.filename, datas.id], func);
    }
}