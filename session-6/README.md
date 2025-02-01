# Add Cousre

## شرح الكود التالي

```js
const course = { id: courses.length + 1, ...req.body };
```

1.  courses.length + 1 هنا سيتم اضافة كورس جديد وذيادة طول المصفوفة بواحد عن طريق الـ
2.  (...req.body) يتم تفريغ محتوى الريكويست داخل المصفوفة عن طريق الـ

# Update Course

## الفرق بين الـ PUT والـ PATCH

1.  PUT: يستخدم لتحديث البيانات كاملة

مثال : تقوم بمسح الأوبجيت القديم وتقوم بإنشاء أوبجيكت جديد مكانة

2.  PATCH: يستخدم لتحديث البيانات جزئيا

مثال : تقوم بتحديث البيانات الجديدة فقط

مثال لو قمت بإرسال name سيقوم بتحديث الـ name فقط

## شرح الكود التالي

```js
course = { ...course, ...req.body };
```

### مثال

الكود التالي سيقوم بعمل تحديث للبيانات القديمة بالبيانات الجديدة

```js
const course = {
  id: 1,
  name: "JavaScript Basics",
  price: 100,
};

const reqBody = {
  name: "Advanced JavaScript",
  price: 150,
};

const updatedCourse = { ...course, ...reqBody };
console.log(updatedCourse); // { id: 1, name: 'Advanced JavaScript', price: 150 }
```

# Delete Course

## شرح الكود التالي

```js
courses = courses.filter((course) => course.id !== id);
```

مثال:
إذا كانت لديك المصفوفة التالية:

```js
let courses = [
  { id: 1, name: "Math" },
  { id: 2, name: "English" },
  { id: 3, name: "History" },
];
let id = 2;
```

ثم قمت بتطبيق الكود:

```js
courses = courses.filter((course) => course.id !== id);
```

ستحصل على النتيجة التالية:

```js
courses = [
  { id: 1, name: "Math" },
  { id: 3, name: "History" },
];
```
