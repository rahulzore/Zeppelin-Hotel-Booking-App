const Rental = require('./model/rental');
const User = require('./model/user');
const fakeDbData = require('./data.json');
const Booking = require('./model/booking');
class FakeDb {
    constructor() {
        this.rentals = fakeDbData.rentals;

        this.users = fakeDbData.users;
    }

    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user1 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);
            newRental.save();
        });

        user.save();
        user1.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;