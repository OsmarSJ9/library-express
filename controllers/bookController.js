const connection = require('../config/connection');
const book = require('../model/book');
const fs = require('fs');
const res = require('express/lib/response');


module.exports = {
    index : function(request, response){
        book.getBooks(connection, function(err, datas){
            console.log(datas);
            response.render('book/index', { title: 'List og books', datas });
        });
        
    },

    create : function(request, response){
    response.render('book/create');
    },

    saveData : function(request, response){
        console.log(request.body);
        console.log(request.file.filename);

        book.insertBook(connection,request.body, request.file, function(err){
            response.redirect('/book');
        });
    },

    deleteData: function(request, response){
        console.log('recepcion');
        console.log(request.params.id);
        book.returnDataByID(connection, request.params.id , function(err, registers){
            var nameImages = "public/images/"+ (registers[0].image);

            if(fs.existsSync(nameImages)){
                fs.unlinkSync(nameImages);
            }
            book.deleteBook(connection, request.params.id, function(err){
                response.redirect('/book');
            })
        });
    },

    editData : function(request, response){
        book.returnDataByID(connection, request.params.id , function(err, registers){
            console.log(registers[0]);
            response.render('book/edit', { book : registers[0]});
        });
        
    },

    update: function(request, response){
        console.log(request.body.name);

        if(request.file){
            if(request.file.filename){
                book.returnDataByID(connection, request.body.id , function(err, registers){
                var nameImages = "public/images/"+ (registers[0].image);

                if(fs.existsSync(nameImages)){
                    fs.unlinkSync(nameImages);
                }
                
                book.updateFile(connection, request.body, request.file, function(err){ });

                });
            }
        }

        if(request.body.title){
            book.updateBook(connection,request.body, function(err){    
            });
        }

        response.redirect('/book');
    }
}
