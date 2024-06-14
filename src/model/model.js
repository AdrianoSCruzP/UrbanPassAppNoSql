const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  user_id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true, maxlength: 20 },
  last_name: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 30 },
  phone: { type: String, required: true, maxlength: 9 },
  password: { type: String, required: true, maxlength: 200 },
  role: {
    role_id: { type: Number, required: true },
    role_name: { type: String, required: true, maxlength: 15 }
  },
  last_login: { type: Date }
}, { collection: 'Users' });

const clientSchema = new Schema({
  client_id: { type: Number, required: true, unique: true },
  user: userSchema
}, { collection: 'Clients' });

const collaboratorSchema = new Schema({
  collaborator_id: { type: Number, required: true, unique: true },
  user: userSchema
}, { collection: 'Collaborators' });

const eventSchema = new Schema({
  event_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, maxlength: 20 },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  promoter: {
    promoter_id: { type: Number, required: true },
    user: userSchema
  },
  collaborator: {
    collaborator_id: { type: Number, required: true },
    user: userSchema
  },
  sponsor: {
    sponsor_id: { type: Number, required: true },
    company_name: { type: String, required: true, maxlength: 30 },
    ruc: { type: Number, required: true },
    email: { type: String, required: true, maxlength: 30 },
    phone: { type: Number, required: true }
  },
  event_location: {
    location_id: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 30 },
    address: { type: String, required: true, maxlength: 40 },
    capacity: { type: Number, required: true }
  }
}, { collection: 'Events' });

const ticketSchema = new Schema({
  ticket_id: { type: Number, required: true, unique: true },
  status: { type: String, required: true, maxlength: 10 },
  event: eventSchema,
  ticket_type: {
    type_id: { type: Number, required: true },
    category: { type: String, required: true, maxlength: 15 },
    price: { type: Number, required: true }
  }
}, { collection: 'Tickets' });

const clientTicketSchema = new Schema({
  ticket: ticketSchema,
  client: clientSchema
}, { collection: 'Client_Tickets', unique: true });

const promoterTicketSchema = new Schema({
  promoter: {
    promoter_id: { type: Number, required: true },
    user: userSchema
  },
  ticket: ticketSchema,
  promoter_earnings: { type: Number, required: true }
}, { collection: 'Promoter_Tickets', unique: true });

const ratingSchema = new Schema({
  client: clientSchema,
  event: eventSchema,
  rating: { type: Number, required: true },
  comment: { type: String, required: true, maxlength: 300 }
}, { collection: 'Ratings', unique: true });

mongoose.model('User', userSchema);
mongoose.model('Client', clientSchema);
mongoose.model('Collaborator', collaboratorSchema);
mongoose.model('Event', eventSchema);
mongoose.model('Ticket', ticketSchema);
mongoose.model('ClientTicket', clientTicketSchema);
mongoose.model('PromoterTicket', promoterTicketSchema);
mongoose.model('Rating', ratingSchema);