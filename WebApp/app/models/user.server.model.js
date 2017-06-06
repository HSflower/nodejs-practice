var mongoose = require('mongoose'),
  crypto = require('crypto'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username : {
    type : String,
    trim : true,
    unique : true,
    required : true
  },
  userid : {
    type : String,
    unique : true,
    required : 'Username is required',
    trim : true
  },
  password : {
    type : String,
    validate : [
      function(password){
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
  salt : {
    type : String
  },
  provider : {
    type : String,
    required : 'Provider is required'
  },
  providerId : String,
  providerData : {},
  email : {
    type : String,
    match : [ /.@.+\..+/, "pleas fiil in a valid e-mail" ]
  },
  created : {
    type : Date,
    default : Date.now
  },
  website : {
    type : String,
    get : function(url){
    // website가 존재하는 데이터는 website를 포함하고, 아니면
    //  website필드 출력하지 않음.
      if(!url){
        return url;
      } else {
        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  },
  role : {
    type : String,
    enum : ['Admin', 'Owner', 'User']
  }
});
//기존데이터에 질의 시 자동으로 created 속성 생성됨

//passport 사용을 위한 메소드 추가
UserSchema.pre('save', function(next){
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});
UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};
UserSchema.statics.findUniqueUserid = function(userid, suffix, callback){
  var _this = this;
  var possibleUserid = userid + (suffix || '' );

  _this.findOne({
    userid: possibleUserid
  }, function(err, user){
    if(!err){
      if(!user){
        callback(possibleUserid);
      } else {
        return _this.findUniqueUserid(userid, (suffix||0)+1, callback);
      }
    } else {
      callback(null);
    }
  });
};

//가상속성 추가 : virtual()메소드 사용
UserSchema.virtual('idpass').get(function(){
  return this.userid + ' ' + this.password;
});
UserSchema.set('toJSON', { getters : true, virtuals : true });
// res.json()을 사용하여 get옵션 정의 값이 JSON에 적용됨.
// set옵션중 virtuals옵션 설정

mongoose.model('User', UserSchema);
//Schema 생성자로 UserSchema객체 정의
