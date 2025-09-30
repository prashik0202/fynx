import User  from './user.model';
import VerificationToken from './verificationToken.model';


User.hasMany(VerificationToken, {
  foreignKey: 'userId',
  as: 'verificationTokens',
});


VerificationToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, VerificationToken };