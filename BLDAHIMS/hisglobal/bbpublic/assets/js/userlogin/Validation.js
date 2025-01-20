		
		/*
		File Name 		: Validation.js
		Version	  		: 1.0
		Developer 		: Ajay Kumar Gupta[Project Associate]
		Supported by 	: Jitu, Lokesh Sachin & Vaibhav
		*/
		
		/*
		Note -->
		1. please name your form as form1;
		2. add your validation string in getValidateStr() function
		3. Add message in getMsg() function
		
		Warning : NO CHANGE WILL BE REFLECTED IN ORIGINAL VALIDATION FILE WITHOUT AJAY,JITU,LOKESH OR VAIBHAV
		PERMISSION
		*/
		
		/*
			List of functions in this file
		
		 1>	function getValidateStr(index)
		 2>	function getMsg(index,conName)
		 3>	function validateData(e,index)
		 4>	function validAmount(obj)
		 5>	function compareDate(frDate,toDate)
		 6>	function validateFields(checkArray,mode)
		 7>	function isDate(theField)
		 8>	function IsAgeValid(theField)
		 9>	function submitForm()
		10>	function removeStrSpace(str)
		11>	function daysInFebruary (year)
		12>	function DaysInMonth(mon, year)
		13> function getSeperator(dtStr)
		14>	function getMonthInt(str)
		15> function parseDate(dtStr,seprator,mode)
		16> function initilizeVar()
		
		
		
		/*============================Global Variables declares here=====================================*/
		var intDay, intMon, intYear;
		
		/*============================Function Starts from here==========================================*/
		
		
		/*function compareWithSysdate(dateToCompare)
		{
			var sysDate = new Date;
			var sysYear = sysDate.getFullYear();
			var sysMon = sysDate.getMonth();
			var sysDay = sysDate.getDate();
			sysMon = sysMon+1;
			
			var comDate = dateToCompare;
			var comYear = comDate.substring(7,11);
			var comMon = getMonthCode(comDate);
			var comDay = comDate.substring(0,2);
			
			
			var retVal ;
			if(sysYear > comYear)
				retVal = false;
			else if(sysYear < comYear)
				retVal = true;			
			else if(sysMon>comMon)
				retVal = false;
			else if(sysMon<comMon)
				retVal = true;
			else if(sysDay>comDay)
				retVal = false;
			else
				retVal = true;
			return retVal;	
	}*/
	
	function getMonthCode(toDate)
	{
			var mon;
			var tDate=toDate.substring(3,6);
			if(tDate=='Jan')
			mon='01';
			else if(tDate=='Feb')
			mon='02';
			else if(tDate=='Mar')
			mon='03';
			else if(tDate=='Apr')
			mon='04';
			else if(tDate=='May')
			mon='05';
			else if(tDate=='Jun')
			mon='06';
			else if(tDate=='Jul')
			mon='07';
			else if(tDate=='Aug')
			mon='08';
			else if(tDate=='Sep')
			mon='09';
			else if(tDate=='Oct')
			mon='10';
			else if(tDate=='Nov')
			mon='11';
			else if(tDate=='Dec')
			mon='12';
			return mon;
		}
		
		//format is dd-Mon-yyyy(21-Jan-2006),
		//pass "" when from date is currnt (System date)
		
		function compareTwodates(fromDate,toDate) 
		{
		
	
		
			var fromYear;
			var fromMon;
			var fromDay;
			var retVal ;
			
			if (toDate=="")
				return false;
						
			if (fromDate=="")
			{
				var sysDate = new Date;
				var sysYear = sysDate.getFullYear();
				var sysMon = sysDate.getMonth();
				var sysDay = sysDate.getDate();
				sysMon = sysMon+1;
			
				fromYear=sysYear;
				fromMon=sysMon;
				fromDay=sysDay;
			}
			else
			{
				fromYear = fromDate.substring(7,11);
			 	fromMon = getMonthCode(fromDate);
			 	fromDay = fromDate.substring(0,2);
			}
			
			var toYear = toDate.substring(7,11);
			var toMon = getMonthCode(toDate);
			var toDay = toDate.substring(0,2);
			
			
			
			if(fromYear > toYear)
				retVal = false;
			else if(fromYear < toYear)
				retVal = true;			
			else if(fromMon>toMon)
				retVal = false;
			else if(fromMon<toMon)
				retVal = true;
			else if(fromDay>toDay)
				retVal = false;
			else
				retVal = true;
			return retVal;	
			
		}
		
		/*this function returns the requested string for validations, any validating string
		can be appended in this function just before default keyword*/
		
	
	function removeLeadingTrailingSpace(str)
	{
		var str;
		str=myTrim(str);
		str=reverse(str);
		str=myTrim(str);
		str=reverse(str);
		return str;	
	} 
	
	function reverse(tmp)
	{
		var ch ="";
		var tmplen=tmp.length;
		tmplen--;
		var i;
		for (i=tmplen;i >=0 ; i--)
		{
			ch += tmp.charAt(i);
		}
		return ch ;	
	}
		
		function myTrim(str)
		{
			var firstSpaceFound = 0;
			var retVal = "";
			if(str=="")
				retVal = str;
			else 
			{
				var ch ="";
				for(var i=0;i<str.length;i++)
				{
					ch = str.charAt(i);
					if(ch==" " && firstSpaceFound ==0)
					{	
						
					}
					else
					{
						retVal += ch;
						firstSpaceFound =1;
					}
				}
			}
			return retVal;
		}
		
		function checkInput(varObj,validationIndex,length,e)
		{
		
		//onkeypress = "checkInput(this,which str to be used,length applicable,event);"
			var returnValue = true;
			var applicableStr = "";
			var key;
			if (window.event)
				key = window.event.keyCode;
				
			else if (e)
				key = e.which;
			
	
			//control keys
			
			if ((key==null) || (key==0) || (key==8) ||
				(key==9) || (key==13) || (key==27) ) // Removed key == 47 By Pratichi Maheshwari
				return true; 
			var keychar = String.fromCharCode(key);
			
			//Validating Length
			if(varObj.value.length==length)
				returnValue = false;
				
				
			//Specifying the applicable character set
			if(validationIndex==1)
				applicableStr = "0123456789";
			if(validationIndex==2)
				applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
			if(validationIndex==3)
				applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
			if(validationIndex==4)
				applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";	
			if(validationIndex==5)
				applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_ ";
			if(validationIndex==6)
				applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./:_?";
			if(validationIndex==7)
				applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";  //used for a-z,A-Z,0-9,space
			if(validationIndex==8)// Added By Pratichi Maheshwari
				applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/ ";
			if(validationIndex==9)// Added By Ankur
				applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			var aa = applicableStr.indexOf(keychar);
			
			if(applicableStr.indexOf(keychar)== -1)
				returnValue = false;
				
							
				return returnValue; 
		
		} 
		
		
		//added on 8-02-2007 
		function checkAlphaNumeric(varObj,validationIndex,length,e)//first character must not be a digit
		{															
		//onkeypress = "checkInput(this,which str to be used,length applicable,event);"
			var returnValue 	=	true;
			var applicableStr 	=	"";
			var code			=	e.charCode;
			var i				=	varObj.value.length;
			var key;
			
			if(i==0)
			{
				if(code==95|| code>=65&&code<=90 || code>=97&&code<=122)
					return true;
				else
					return false;
			}
			else
			{
				if (window.event)
					key = window.event.keyCode;
				else if (e)
					key = e.which;
			
			//control keys
			
				if ((key==null) || (key==0) || (key==8) ||
					(key==9)|| (key==27) || (key==47)) 
					return true; 
				var keychar = String.fromCharCode(key);
				
			//Validating Length
				
				if(i==length)
				returnValue = false;
				
			//Specifying the applicable character set
			
				if(validationIndex==1)
					applicableStr = "0123456789";
				if(validationIndex==2)
					applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
				if(validationIndex==3)
					applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
				if(validationIndex==4)
					applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";	
				if(validationIndex==5)
					applicableStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_ ";
				if(validationIndex==6)
					applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./:_";
				if(validationIndex==7)
					applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
				if(validationIndex==8)// Added by Anshul
					applicableStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				var aa = applicableStr.indexOf(keychar);
			
			
				if(applicableStr.indexOf(keychar)== -1)
				{
			
					returnValue = false;
				}	
			
				
				
					return returnValue; 
			}
		} 
		
		function getValidateStr(index)
		{
			var str = "";
		
			switch(index)
			{
				case 1:		//for validating email
					str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_@.";
					break;
		
				case 2:		//for validating telephone no
					str = "1234567890-";
					break;
		
				case 3:		//for validating address
					str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-/,.#$()';: ";
					break;
		
				case 4:		//for validating name
					str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .";
					break;
		
				case 5:		//numeric only
					str = "1234567890";
					break;
		
				case 6:		//numeric with space
					str = "1234567890 ";
					break;
		
				case 7:		//for validating amount
					str = "1234567890.";
					break;
		
				case 8:		//alphanumeric
					str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
					break;
		
				case 9:		//alphanumeric with space
					str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";
					break;
		
				case 10:	//Character only
					str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
					break;
		
				case 11:	//Character with space
					str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
					break;
		
				case 12:	//Upper character only
					str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					break;
		
				case 13:	//Upper character with space
					str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
					break;
		
				case 14:	//Lower character
					str = "abcdefghijklmnopqrstuvwxyz";
					break;
		
				case 15:	//Lower character with space
					str = "abcdefghijklmnopqrstuvwxyz ";
					break;
		
				case 16:	//alphanumeric with dot
					str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.";
					break;
		
		
			}	//end of Switch statement
			return str;
		}
		
		
		//this function will have the user defined messages
		function getMsg(index,conName)
		{
			var msgStr = "";
		
			switch(index)
			{                    
				case 1:
					msgStr = "Invalid amount entered [" + conName + "]";
					break;
				case 2:
					msgStr = "Invalid e-mail entered [" + conName + "]";
					break;
				case 3:
					msgStr = "Invalid Date entered [" + conName + "]";
					break;
				case 4:
					msgStr = "From Date is greater than To Date [" + conName + "]";
					break;
				case 5:
					msgStr = "Current Date is greater than " + conName;
					break;
				case 6:
					msgStr = "[" + conName + "] is blank";
					break;
				case 7:
					msgStr = "[" + conName + "] is not selected";
					break;
				case 8:
					msgStr = "Invalid age entered [" + conName + "]";
			}	//end of switch statement
		
			alert(msgStr);
			return;
		}
		
		
		
		//this function accepts index, based on index it validates the specified character within the string
		//defined in getValidateStr function. it validates single character at a time.
		function validateData(e,index)
		{
			var key,keychar,str;
		
			if (window.event)
				key = window.event.keyCode;
			else
			{
				if (e)
					key = e.which;
				else
				   return true;
			}
		
			keychar = String.fromCharCode(key);
		
			// control keys
			if ((key==null) || (key==0) || (key==8) ||
				(key==9) || (key==13) || (key==27) )
				return true;
			else
			{
				str = getValidateStr(index)
				if (((str).indexOf(keychar) > -1))
				   return true;
				else
				   return false;
			}
		
		}//end of validateStr function
		
		
		
		//this function validates the amount.this function requires the object
		//call this function if you have validated each & every digit using validateData function
		function validAmount(obj)
		{
			var index,len;
			var tempStr;
			var sts = 0;
		
			len = obj.value.length;
			tempStr = obj.value;
			index = tempStr.indexOf(".");
		
			if (index > -1)	//amount is in decimal
			{
				if (len == index+1)	//No digit after decimal point
					sts = 1;
				else
				{
					if (tempStr.indexOf(".",index+1) > -1)	//more than one decimal point
						sts = 1;
				}
			}	//end if
		
			if (sts == 1)
			{
				getMsg(1,obj.name);
				obj.focus();
				return false;
			}
		
			return true;
		
		}//end of amountOnly
		
		
		
		//this function compares two date. pass blank to frDate if you want to compare toDate with current Date
		//this function accepts the object. date should be dd-mm-yyyy format if mode = 1 otherwise dd-mmm-yyyy
		function compareDate(frDate,toDate,mode)
		{
			var frValue, toValue,frYear, frMon, frDay,sts = 0;
		
			//validating todate
			if (frDate == "" || frDate == null)
			{
				
				frValue = new Date;
				frYear = frValue.getYear();
				frMon = frValue.getMonth();
				frDay = frValue.getDate();
			}
			else
			{
				
				if (isDate(frDate,mode) == true)
				{
					frYear = intYear;
					frMon = intMon;
					frDay = intDay;
		
					if (isDate(toDate,mode) == true)
					{
						if (frYear > intYear)
							sts = 1;
						else
						{
							if (frYear == intYear)
							{
								if (frMon > intMon)
									sts = 1;
								else
								{
									if (frMon == intMon)
									{
										if (frDay > intDay)
											sts = 1;
									}
								}
							}
						}
					}
					else
					{
						toDate.focus();
						return false;
					}
				}
				else
				{
					frDate.focus();
					return false;
				}
			}
		
			if (sts == 1)
			{
				if (frDate == "" || frDate == null)		//validating current date with toDate
					getMsg(5,toDate.name);
				else
					alert(frDate.name + " is greater than " + toDate.name);
		
				frDate.focus();
				return false;
			}
		
			return true;
		
		}
		
		
		/*this function checks those fields that is in checkArray for not null and submits the form
		if mode = 1
		checkArray = new Array("Control Name1","Control Name 2",-----) for calling this function
		mode parameter*/
		function validateFields(checkArray,mode)
		{
			var i,type;
			var arrLen = checkArray.length;
			var obj;
		
			for ( i = 0 ; i < arrLen ; i++ )
			{
				obj = document.form1.elements[checkArray[i]];
				type = obj.type;
		
				switch(type)
				{
					case "text":
						if(obj.value == null || obj.value == "")
						{
							getMsg(6,obj.name);	//displays error message
							obj.focus();
							return false;
						}
						break;
		
					case "select-one":
						if(obj.value == 0)
						{
							getMsg(7,obj.name);	//displays error message
							return false;
						}
						break;
				}
			}
		
			if (mode == 1) submitForm();
			return true;
		
		}//end of validateFun
		
		
		
		//this function validates the date. the format should be dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
		//if mode = 1 otherwise dd/mmm/yyyy or dd-mmm-yyyy or dd.mmm.yyyy
		function isDate(theField,mode)
		{
			var dtStr = removeStrSpace(theField.value);
			var seprator = "";
		
			if (dtStr == "") return false;
			seprator = getSeperator(dtStr)		//function that returns seperator
			if (seprator != "")
			{
				if (parseDate(dtStr,seprator,mode) == true)
				{
					theField.value = dtStr;
					return true;
				}
			}
		
			getMsg(3,theField.name);	//display error message
			theField.focus();
			return false;
		}
		//End OF Date Method
		
		
		/*this function validates the age*/
		function IsAgeValid(theField)
		{
			if (theField.value <= 0 || theField.value > 130)
			{
				getMsg(8,theField.name);
				theField.focus();
				return false;
			}
			return true;
		}//End of function IsAgeValid()
		
		
		
		/*this function submits the page*/
		function submitForm()
		{
			document.form1.submit();
		}//end of validateFun
		
		
		
		/* Function For Removing spaces */
		function removeStrSpace(str)
		{
			var j;
			var len = str.length;
			var retStr ="";
		
			for(j = 0;j <= len;j++)
			{
				if(str.charAt(j) != " ")
					retStr += str.charAt(j);
			}
			return retStr;
		}
		
		
		//returns day in feb month for specified year
		function daysInFebruary (year)
		{
			return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
		}
		
		
		//this function returns no of days in a month for the specified year
		function DaysInMonth(mon, year)
		{
			var retVal;
		
			retVal = 31;
			if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {retVal = 30;}
			if (mon == 2) {retVal = daysInFebruary(year);}
		   	return retVal;
		}
		
		//this function finds the seperator used for seperating the date
		function getSeperator(dtStr)
		{
			var seprator = "";
		
			if (dtStr.indexOf("-") > -1)
				seprator = "-";
			else
			{
				if (dtStr.indexOf("/") > -1)
					seprator = "/";
				else
				{
					if (dtStr.indexOf(".") > -1)
						seprator = ".";
				}
			}	//endif
			return seprator;
		}
		
		
		//this function converts the month(in string) into month(in integer)
		function getMonthInt(str)
		{
			var month = -1;
		
			switch(str.toUpperCase())
			{
				case "JAN":
					month = 1;
					break;
				case "FEB":
					month = 2;
					break;
				case "MAR":
					month = 3;
					break;
				case "APR":
					month = 4;
					break;
				case "MAY":
					month = 5;
					break;
				case "JUN":
					month = 6;
					break;
				case "JUL":
					month = 7;
					break;
				case "AUG":
					month = 8;
					break;
				case "SEP":
					month = 9;
					break;
				case "OCT":
					month = 10;
					break;
				case "NOV":
					month = 11;
					break;
				case "DEC":
					month = 12;
					break;
			}
			return month;
		}
		
		
		//this function parses the date inti day, month & year
		function parseDate(dtStr,seprator,mode)
		{
			var pos1,pos2;
			var len = dtStr.length;
		
			initilizeVar();		//initilizes the variables
			pos1 = dtStr.indexOf(seprator);
			pos2 = dtStr.indexOf(seprator,pos1+1);
		
			if (len > 8 && len <= 11)
			{
				if (pos1 > 0 && pos1 <= 2)	//validations for day
				{
					if (pos2 > pos1 + 1 && len == pos2 + 5)	//validation for month & year
					{
						//getting value seperately and convert it into int
						intDay = parseInt(dtStr.substring(0,pos1),'10');
						if (mode == 1)
							intMon = parseInt(dtStr.substring(pos1+1,pos2),'10');
						else
							intMon = getMonthInt(dtStr.substring(pos1+1,pos2));
		
						intYear = parseInt(dtStr.substring(pos2+1),'10');
		
						if (intMon >= 0 && intMon <= 12)
						{
							if (intYear >= 1900 && intYear <= 2100)
							{
								if (intDay > 0 && intDay <= DaysInMonth(intMon, intYear))
									return true;
							}//end if
						}//endif
					}//endif
				}//endif
			}//endif
			return false;
		}
		
		
		//this function initilizes the global variable
		function initilizeVar()
		{
			intDay = "";
			intMon = "";
			intYear = "";
		}
		
		/*=========================================end of file===============================================*/