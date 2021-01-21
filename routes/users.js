const express = require("express");
const router = express.Router();

const data = [
	{
		id: 1,
		name: "Alex Doe",
		age: 21,
		email: "alex@gmail.com",
	},
	{
		id: 2,
		name: "Mike Doe",
		age: 25,
		email: "Mike@gmail.com",
	},
	{
		id: 3,
		name: "Joe Doe",
		age: 30,
		email: "Joe@gmail.com",
	},
];

function getNextID() {
	return data[data.length - 1].id + 1;
}

router
	.route("/")
	.get((req, res) => {
		res.json(data);
	})
	.post((req, res) => {
		const user = req.body;
		user.id = getNextID();
		data.push(user);
		res.json(data);
	});

router
	.route("/:id")
	.get((req, res) => {
		const id = parseInt(req.params.id);
		let user;

		data.map((el) => {
			if (el.id === id) {
				user = el;
			}
		});

		user ? res.json(user) : res.status(404).json({message: "User not found"});
	})
	.put((req, res) => {
		const id = parseInt(req.params.id);
		let keys = Object.keys(req.body);

		data.map((el) => {
			keys.map((key) => {
				if (el.id === id) {
					el[key] = req.body[key];
				}
			});
		});

		res.json(data);
	})
	.delete((req, res) => {
		const id = parseInt(req.params.id);
		data.map((el, index) => {
			if (el.id === id) {
				data.splice(index, 1);
			}
		});

		res.json(data);
	});

module.exports = router;
