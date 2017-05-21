export class StringUtils {
    /**
     * Validates the form of email
     * @params - email string to be validated
     * @returns boolean if valid(true) or invalid(false)
     */
    public static IsValidEmailAddress(sEmail:string):boolean
    {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !(sEmail == "" || sEmail.length <= 5 || !EMAIL_REGEXP.test(sEmail));
    }

    /**
     * Removes first and last white space after the string
     * @params - string to be trimmed
     * @returns string with no forward and last white space
     */
    public static TrimString(str: string):string
    {
        return str == null ? "" : str.trim();
    }
    
    /**
     * Removes duplicate spaces in a string
     * @params - string to be trimmed
     * @returns string with no double spaces in between words
     */
    public static RemoveDuplicateSpaces(str: string):string
    {
        return str.replace(new RegExp("\\s+", "g"), " ");
    }
}