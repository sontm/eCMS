
class AppUtils {
    createUserFromRecordForJWT(userRecord) {
        //userId:string,email:string,phone:string,password:string,fullName:string,pictureUrl:string,
        //  accessToken:string,userType:string,roleId:integer
        if (userRecord) {
            let result = {
                'userId': userRecord.userId,
                'email': userRecord.email,
                'phone': userRecord.phone,
                'fullName': userRecord.fullName,
                'pictureUrl': userRecord.pictureUrl,
                'userType': userRecord.userType,
                'accessToken': userRecord.accessToken
            }
            return result;
        }
        return {};
    }
}
const apputil = new AppUtils();
export default apputil;