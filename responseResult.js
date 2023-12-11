

// start ResponseDto
function getStatus500(res,result){res.status(500).json(result);}
function getStatus200(res,result){res.status(200).json(result);}
function getStatus400(res,result){res.status(400).json(result);}

function CheckResultSuccess(res, error, results,operation_type)
{
    if (error) {
        let resultRes = getResponseError(null,error_message=error,operation_type);
        getStatus500(res,resultRes);
      //res.status(500).json({ error: 'Failed to retrieve category' });
    } else {
        getStatus200(res,getResponseSuccess(results,operation_type,""));
      //res.json(getResponseSuccess(results,operation_type,""));      
    };
}
function CheckResultSuccessAED(res, error, result,operation_type)
{
    if (error) {
        let resultRes = getResponseError(error.errno,error_message=error.sqlMessage,operation_type);
        getStatus500(res,resultRes);
    } else if(result.success == true){
        let resultRes = getResponseSuccessAED(result.id,operation_type,result.message);
         getStatus200(res,resultRes);
    } else {
        let resultRes = getResponseError("480",error_message=result.message,operation_type);
      getStatus400(res,resultRes);
      
    };
}

function CheckResultSuccessValue(res, title,operation_type)
{
    getStatus200(res,getActionValue(title,operation_type));
    //res.json(getActionValue("فئات المصروفات",operation_type));
    
}

// end ResponseDto

// start Response
    function getResponse(operation_type, is_success= false, message= "", code= "",  data, error)
    {
        let result = {
            "is_success": is_success,
            "message": message,
            "code": code,
            "operation_type": operation_type,
            "data": data,
            "error": error
        };
        return result;
    }

    function getResponseSuccess(data, operation_type, message="")
    {
        // return getResponse(is_success=true,message=message,data=data,operation_type=operation_type,error=null); 
        return getResponse(operation_type,true,message=message,"",data=data,error=null);            
    }
    function getResponseSuccessAED(id, operation_type, message="")
    {
        _message="تمت العملية بنجاح";
        data = {"success":true,"id":id,"message":_message};
        return getResponseSuccess(data,operation_type,_message);
    }
    function getResponseError(error_code,error_message, operation_type)
    {
        errorObj = {"error_code":error_code,"error_message":error_message};        
        return getResponse(operation_type,false,message=error_message,"",data=null,error=errorObj); 
    }
    function getResponseException(ex, operation_type)
    {
        message="an exception occurred"; 
        errorObj = {"error_code":"492","error_message":message};         
        //errorObj = {"error_code":ex,"error_message":message};       
        return getResponse(operation_type,false,message=message,"",data=null,error=errorObj); 
    }
    function getActionValue(value, operation_type = "get")
    {
        values ={"value":value};//getActionDict
        return getResponseSuccess(data=values,operation_type=operation_type,"");
    }
// end Response
    module.exports = {
        getResponse,
        getResponseSuccess,
        getResponseSuccessAED,
        getResponseError,
        getResponseException,
        getActionValue,
        getStatus200,
        getStatus400,
        getStatus500,
        CheckResultSuccess,
        CheckResultSuccessAED,
        CheckResultSuccessValue
      };