/*
props -> incoming data for a component
->  js vitra html lekheko jsx
-> html vitra js lekheko interpolation
-> interpolation ko symbol vitra valid js code lekhna milxa 
-> functional component ma state mentain garna pardaina khali tesle props ko aadhar ma data dinxa
-> super() keyword le constructor lai call garxa parent ko, inheritance ma parent ko constructor lai call garxa
-> parent ma vako jati pani props xa jati pani state xa tyo sabai kura this ma aauxa this class vitra ko object ho

-> class based component banaunu ko reason vanekai state mentain garna laai ho

-> formik docs for form, form validation
-> virtualDOM le garda UI ma flicker effect dekhidaina. virtual dom bata changes haru detection vairako hunxa
=> due to virtual dom(yesbata changes haru detection hunxa) their is no effect of loading the website

-> swagger UI for the API documentation if there is no backend data and being the frontend developer we must need an API

-> YUP => runs validations

=> Component life cycle stages:
1. initial stage(init stage) => data preparation
                => initialize initial values, assign values
                => method: componentDidMount(){} 
                (self invoked function)
2. update stage => application data (state and props data) modify vayo vane update stage ma pugxa
                => check differences
                => componentDidUpdate(){}
3. destroy stage => lifecycle , component nai sakkiyo vane hami lai destroy vanne stage chainxa
                => subscription and async task must be closed
                => componentWillUnMount(){}, yo function component jati khera destroy vayo teti khera aaphai run hunxa 

Single Page Application
=> page reload nagarikina page ko content matrai change garera routing garnu

=> routing component ko props ma jaile pani history(navigation sanga related), match(params: dynamic value sanga related) ra location(data sanga related) pass hunxa by default


=> react-router-dom
BrowserRouter -> wrapper
Route -> routing configuration
Route will have attributes like path component exact
Route will add props to its component
history => functions
match => dynamic url value
location => routing data

Link for clicking navigation
Switch to ensure one component is loaded

=> free personal website templates for personal website


=> utility library, utility ko kura haru chalaunu paryo vane ->go to awesome react components (yo aaphai ma library chai haina) (github repository tesle chai tapai lai react ma k k kura haru chaina sakxa tyo kura haru lai awesome react component le group gardeko xa)

library:
-> react-hot-toast, react-toastify

swagger demo and example
being a frontend developer, backend developer bata server ko base url lina parxa or the link of postman

http client library -> fetch API, axios



******--------------******
.env setup for configuration

-> error service
-> notification service
-> when using third party utility library always try to limit the scope within a file


redux
web architecture

MVC
model, view, controller
bidirectional data flow between model and controller


FLUX (facebook)
views ===> actions ===> dispatchers ===> store
views ==> react component (UI) action trigger (click)
actions ==> actions is used to dispatch event to dispatchers
        ==> actions can be called from response of API
dispatchers ==> it sends actions to store to update data
store ==> contains the application state
      ==> holds logic to update application state

=> unidirectional data flow
=> there can be multiple store


REDUX (Dan Abramov)
views,===> actions,===> reducers,===> store
=> unidirectional data flow
=> state management tool, maintain application state
=> make single centralized store (single source of truth)
=> there will be single store
==> views (UI)-> (react component)
==> actions -> determine what needs to be documentation
==> reducer -> plain functions ->store changing logic resides on reducers
==> store -> application state


*/