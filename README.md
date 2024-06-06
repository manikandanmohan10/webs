## webs

webs

## Project Description

### Doctype:

Service Request Doctype

Fields:
- Customer name
- Requested Date
- Status

Child Table Fields:
1) Service Details

    - Description
    - Price
    - Quantity
    - Total


## Workflow

Draft -> Approved -> submitted

Draft -> Rejected 

Draft -> Negotiate -> Approved -> Submitted

## Webpage and Webview

Webview url to show the list of service requests:

```Hostname + /sr```

Webpage url to show the document details

```hostname + /sr/<name>```

## conditions:

Hiding fields are quantity, total

1) Approve 
    - Hide few fields of child table on web page
2) Reject 
    - Hide few fields of child table on desk in the doctype
3) Negotiate 
    - Show all fields on desk and web for that doctype

### Fixtures:

- Webpage 
- Workflow
- Workflow State
- Workflow Action Master


#### License

mit


