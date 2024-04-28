export default m => {
    const UserSchema = m.Schema({
        login: String,
        password: {
            type: String,
            required: [true, 'Password is necessity!']
        }
    });
    return m.model('User', UserSchema);
}