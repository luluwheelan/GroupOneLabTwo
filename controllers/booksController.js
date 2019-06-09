const book = require('../models/book');

exports.index = (req, res) => {
    book.find()
    .then(books => {
        //deliever the data to the view
        res.render('books/index', {
            books: books,
            title: 'Book List'
        });
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};

exports.show = (req, res) => {
    book.findById(req.params.id)
    .then(book => {
        res.render('books/show', {
            book: book,
            title: book.title
        });
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};

exports.new = (req, res) => {
    res.render('books/new', {
        title: 'New book Post'
    });
};

//edit and show almost the some, they use same form
exports.edit = (req, res) => {
    book.findById(req.params.id)
    .then(book => {
        res.render('books/edit', {
            book: book,
            title: book.title
        });
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};

exports.create = (req, res) => {
    book.create(
        req.body.book
    //     {
    //     title: req.body.book.title,
    //     content: req.body.book.content,
    //     status: req.body.book.status
    // }
    )
    .then(() => {
        //no render from post!!!!! But redirect to other page
        res.redirect('/books');
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};

exports.update = (req, res) => {
    book.updateOne({
        _id: req.body.id
    }, req.body.book, {
        runValidators: true
    })
    .then(() => {
        res.redirect(`/books/${req.body.id}`);
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};

exports.destroy = (req, res) => {
    book.deleteOne({ 
        _id: req.body.id
    })
    .then(() => {
        res.redirect("/books");
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });
};


//To fill in later
exports.drafts = (req, res) => {};
exports.published = (req, res) => {};