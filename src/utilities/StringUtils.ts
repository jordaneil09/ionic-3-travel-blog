export class StringUtils {
    public static IsValidEmailAddress(sEmail:string):boolean
    {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !(sEmail == "" || sEmail.length <= 5 || !EMAIL_REGEXP.test(sEmail));
    }

    public static TrimString(str: string):string
    {
        return str == null ? "" : str.trim();
    }
    
    public static RemoveDuplicateSpaces(str: string):string
    {
        return str.replace(new RegExp("\\s+", "g"), " ");
    }
}