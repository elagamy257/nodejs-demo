# 📘 الدليل الشامل والمبسط لمشروع (Bookstore API) - Node.js + Express + MongoDB

> **ملاحظة:** هذا الدليل مُصمم خصيصاً لمراجعة ومذاكرة المشروع بالكامل من الألف إلى الياء، مع الاعتماد الحصري والكامل على الكود الفعلي للمشروع بدون إضافة أي ميزات غير موجودة.

---

## 📑 جدول المحتويات
1. [البداية والمفاهيم الأساسية](#1-البداية-والمفاهيم-الأساسية)
2. [هيكلية المشروع (Project Structure)](#2-هيكلية-المشروع-project-structure)
3. [إطار العمل Express.js](#3-إطار-العمل-expressjs)
4. [قواعد البيانات Mongoose & MongoDB](#4-قواعد-البيانات-mongoose--mongodb)
5. [المسارات والأنشطة (Routes & Endpoints Table)](#5-المسارات-والأنشطة-routes--endpoints-table)
6. [التحكم والمعالجة (Controllers Deep-Dive)](#6-التحكم-والمعالجة-controllers-deep-dive)
7. [التوثيق والصلاحيات (Authentication & Authorization)](#7-التوثيق-والصلاحيات-authentication--authorization)
8. [استعادة كلمة السر (Password Reset Flow)](#8-استعادة-كلمة-السر-password-reset-flow)
9. [التحقق من البيانات وإدارة الأخطاء (Validation & Error Handling)](#9-التحقق-من-البيانات-وإدارة-الأخطاء-validation--error-handling)
10. [رفع الملفات (File Upload with Multer)](#10-رفع-الملفات-file-upload-with-multer)
11. [توثيق الـ API باستخدام Swagger UI](#11-توثيق-الـ-api-باستخدام-swagger-ui)
12. [الرفع والتشغيل على Vercel (Deployment)](#12-الرفع-والتشغيل-على-vercel-deployment)
13. [الحاجات اللي لازم أكون فاهمها لو اتسألت في Interview](#13-الحاجات-اللي-لازم-أكون-فاهمها-لو-اتسألت-في-interview)
14. [مخططات تدفق البيانات (Project Flow Diagrams)](#14-مخططات-تدفق-البيانات-project-flow-diagrams)
15. [المراجعة النهائية وقائمة التدقيق (Final Revision & Checklist)](#15-المراجعة-النهائية-وقائمة-التدقيق-final-revision--checklist)

---

## 1. البداية والمفاهيم الأساسية

### يعني إيه Node.js؟
Node.js هو **بيئة تشغيل (JavaScript Runtime Environment)** مبنية على محرك **V8** الخاص بمتصفح Google Chrome. يسمح لك بتشغيل كود السكريبت JavaScript على السيرفر (Server-side) خارج المتصفح.
- **Single-Threaded**: يعمل على thread واحد رئيسي مع خوارزمية **Event Loop**.
- **Non-Blocking I/O**: يقوم بالعمليات غير المتزامنة (مثل القراءة من قواطع البيانات أو الشبكة) دون إيقاف تنفيذ باقي الكود (Asynchronous).

### ليه استخدمناه في المشروع؟
- بناء RESTful API سريع وخفيف الوزن (Lightweight).
- معالجة طلبات الـ HTTP والـ JSON بمرونة عالية مع Express.
- توافق تام لغة واحدة (JavaScript) بين الكود وقواعد بيانات MongoDB التي تتعامل بصيغة BSON/JSON.

### إزاي عملنا setup للمشروع؟
1. إنشاء مجلد المشروع وتهيئته عبر `npm init -y`.
2. تثبيت الحزم المطلوبة من خلال `npm install <package-name>`.

### حزم المكتبات (Dependencies) ووظيفة كل حزمة:

#### 📦 الإنتاجية (Dependencies):
| الحزمة | الوظيفة ودورها في المشروع |
| :--- | :--- |
| **`express`** (`^5.2.1`) | إطار العمل الرئيسي لبناء السيرفر، وتوجيه الـ Routes والمعالجات (Middlewares). |
| **`mongoose`** (`^9.10.0`) | مكتبة (ODM) للاتصال بقاعدة بيانات MongoDB وإدارة الـ Schemas والـ Models. |
| **`jsonwebtoken`** (`^9.0.3`) | إنشاء والتحقق من التوكنات التشفيرية (JWT) للـ Authentication. |
| **`bcryptjs`** (`^3.0.3`) | تشفير كلمات المرور باستخدام خوارزمية الهەش (Hashing) قبل حفظها في قاعدة البيانات. |
| **`joi`** (`^18.2.8`) | التحقق من صحة المدخلات القادمة من الـ Client (Req.body Validation). |
| **`joi-password-complexity`** (`^5.2.0`) | إضافة قواعد تعقيد للشفرة السرية (حروف كابيتال، رموز، أرقام). |
| **`multer`** (`^2.4.0`) | معالجة رفع الملفات والصور عبر الـ Request Form-Data وحفظها على السيرفر. |
| **`nodemailer`** (`^10.0.10`) | إرسال إيميلات حقيقية (مثل روابط إعادة ضبط كلمة السر عبر Gmail SMTP). |
| **`ejs`** (`^6.0.1`) | محرك قوالب (View Engine) لرندر صفحات HTML ديناميكية لإعادة ضبط كلمة السر. |
| **`helmet`** (`^8.3.0`) | حماية الهيدرز الخاصة بالـ HTTP برفع الأمان وسد الثغرات الأمنية الشائعة. |
| **`cors`** (`^2.8.6`) | السماح للـ Frontend من دومينات مختلفة بطلب الـ APIs (Cross-Origin Resource Sharing). |
| **`compression`** (`^1.8.2`) | ضغط الـ Responses (Gzip) لتقليل حجم البيانات المرسلة وتسريع الاستجابة. |
| **`dotenv`** (`^17.4.2`) | قراءة المتغيرات البيئية من ملف `.env` وتخزينها في `process.env`. |
| **`express-async-handler`** (`^1.2.0`) | تغليف الدوال غير المتزامنة لتمكّن من التقاط الـ Async Errors وتلقائياً تمريرها للـ Error Middleware بدون try/catch تكراري. |
| **`swagger-ui-express`** (`^5.0.1`) | تشغيل واجهة Swagger UI التفاعلية لتجربة الـ APIs من المتصفح. |
| **`swagger-jsdoc`** (`^6.3.0`) | قراءة التعليقات الجانبية (JSDoc Comments) وتحويلها لمواصفات OpenAPI 3.0. |

#### 🛠️ التطوير (DevDependencies):
| الحزمة | الوظيفة |
| :--- | :--- |
| **`nodemon`** (`^3.1.14`) | إعادة تشغيل السيرفر تلقائياً بمجرد تعديل وحفظ أي ملف أثناء التطوير. |
| **`@types/node`** / **`@types/express`** | توفير التلميحات والإكمال التلقائي للرموز في بيئات التطوير. |

---

## 2. هيكلية المشروع (Project Structure)

```text
nodejs-demo/
├── api/
│   └── index.js              # نقطة دخول Vercel (Serverless Bridge)
├── config/
│   └── db.js                 # إعدادات الاتصال بقاعدة البيانات MongoDB
├── controllers/
│   ├── authController.js     # منطق التسجيل والدخول
│   ├── authorController.js   # عمليات المؤلفين (CRUD)
│   ├── bookController.js     # عمليات الكتب (CRUD)
│   ├── passwordController.js # إعادة ضبط كلمة السر عبر الإيميل والقوالب
│   └── userController.js     # إدارة المستخدمين والتعديل عليهم
├── models/
│   ├── Author.js             # موديل وقواعد صحة بيانات المؤلفين
│   ├── Book.js               # موديل وقواعد صحة بيانات الكتب
│   └── User.js               # موديل المستخدم والتشفير وقواعد البيانات
├── routes/
│   ├── auth.js               # مسارات التسجيل والدخول
│   ├── author.js             # مسارات إدارة المؤلفين
│   ├── books.js              # مسارات إدارة الكتب
│   ├── password.js           # مسارات إعادة ضبط الشفرة
│   ├── upload.js             # مسار رفع الصور
│   └── users.js              # مسارات إدارة المستخدمين
├── middlewares/
│   ├── errors.js             # التعامل مع المسارات غير الموجودة والأخطاء العامة
│   ├── logger.js             # تسجيل الطلبات القادمة (Custom Logger)
│   └── verfiyToken.js        # التحقق من الـ JWT التوكن والصلاحيات
├── views/
│   ├── forget-password.ejs   # صفحة طلب إرسال رابط كلمة السر
│   ├── link-send.ejs         # صفحة تأكيد إرسال الإيميل
│   ├── reset-password.ejs    # صفحة كتابة كلمة السر الجديدة
│   └── success-password.ejs  # صفحة نجاح تغيير كلمة السر
├── images/                   # المجلد المستهدف لتخزين الصور المرفوعة
├── app.js                    # الملف الرئيسي لتكوين تطبيق Express والـ Middlewares
├── vercel.json               # ملف إعدادات توجيه الـ Routes في Vercel
├── .vercelignore             # استثناء الملفات غير المطلوبة عند الرفع لـ Vercel
├── .env / .env.example       # المتغيرات البيئية (سرية ومثال)
├── package.json              # بيانات المشروع والـ Dependencies
├── data.js / seeder.js       # بيانات وهمية واسكريبت رفع البذر الأولي
└── NodeJS_Project_Study_Guide.md # هذا الدليل التعليمي الشامل
```

---

## 3. إطار العمل Express.js

### إنشاء التطبيق والـ Middlewares الأساسية (`app.js`)
في ملف `app.js` تم بناء التطبيق كالتالي:

```javascript
const express = require("express");
const app = express();

// Security & Optimization Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Logger
app.use(logger);

// Static Assets & Views
app.use(express.static(path.join(__dirname, "images")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
```

### وظيفة كل Middleware:
1. **`express.json()`**: يفك شفرة البيانات القادمة بتركيب JSON في الـ Request Body ويتيحها في `req.body`.
2. **`express.urlencoded({ extended: false })`**: يفك شفرة البيانات القادمة من HTML Forms.
3. **`express.static(path.join(__dirname, "images"))`**: يتيح الوصول للصور المرفوعة عبر روابط مباشرة مثل `http://domain/image.png`.
4. **`logger`**: كود مخصص يطبع في الـ Console اسم الـ Method والـ URL والـ IP لكل طلب قادم.
5. **`notFound`**: يمسك أي طلب يقصد مساراً غير موجود ويخرج بـ Status `404 Not Found`.
6. **`errorHandler`**: يمسك أي خطأ داخلي في التطبيق ويخرج بـ Status `500 Internal Server Error`.

### تشغيل السيرفر المتكيف مع بيئة Vercel:
```javascript
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode on port ${port}`);
  });
}

module.exports = app;
```
> **لماذا؟** بشرط `require.main === module` يعمل السيرفر محلياً بملف `app.js` مباشرة، بينما في بيئة Vercel يتم تصدير `app` لتشغيله كـ Serverless Function دون حجز Port ثابت دائم.

---

## 4. قواعد البيانات Mongoose & MongoDB

### الاتصال بقاعدة البيانات (`config/db.js`)
تم إعداد دالة اتصل تراعي استدامة الحاوية في الـ Serverless Warm Starts:

```javascript
const mongoose = require("mongoose");

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return; // إعادة استخدام الاتصال القائم
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Connection Failed To MongoDB!", error.message);
  }
}
```

---

### الموديلات والـ Schemas بالتفصيل:

#### 1. موديل المستخدم (`models/User.js`)
* **الحقول (Fields):**
  - `email`: String (مطلوب، فريد Unique، الطول بين 5 و 100 حرف).
  - `username`: String (مطلوب، فريد Unique، الطول بين 3 و 100 حرف).
  - `password`: String (مطلوب، مشفر بواسطة bcrypt، الحد الأدنى 8 أحرف).
  - `isAdmin`: Boolean (الافتراضي `false`).
  - `timestamps`: تلقائياً ينشئ `createdAt` و `updatedAt`.
* **دالة الموديل (`generateToken`):**
  أنشأنا دالة على الـ Schema لتوليد JWT Token يحمل `id` و `isAdmin`:
  ```javascript
  UserSchema.methods.generateToken = function () {
    const secret = process.env.JWT_SECRET || process.env.JWT_SECERT_KEY;
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, secret);
  };
  ```

#### 2. موديل الكتاب (`models/Book.js`)
* **الحقول (Fields):**
  - `title`: String (مطلوب، الطول بين 3 و 100).
  - `author`: ObjectId (ربط ومؤشر `ref: "Author"` على جدول المؤلفين).
  - `description`: String (مطلوب، الحد الأدنى 5).
  - `price`: Number (مطلوب، لا يقل عن 0).
  - `coverImage`: String (مطلوب، قيم محددة Enum: `["softcover", "hardcover", "ebook"]`).

#### 3. موديل المؤلف (`models/Author.js`)
* **الحقول (Fields):**
  - `firstName`: String (مطلوب، بين 3 و 50).
  - `lastName`: String (مطلوب، بين 3 و 50).
  - `nationality`: String (مطلوب، بين 3 و 50).
  - `birthDate`: Date (مطلوب).
  - `image`: String (افتراضي رابط صورة مؤقتة).

---

### العلاقات ودوال المونجوس المستخدمة فعلياً:
- **العلاقات (Relationships):** علاقة **One-to-Many** بين المؤلف والكتب؛ فكل كتاب يحمل معرف مؤلف `author` وتستخدم دالة `.populate("author", ["_id", "firstName", "lastName"])` لدمج بيانات المؤلف أثناء جلب الكتب.
- **العمليات المستعملة (CRUD Queries):**
  - `find()`: جلب الكل مع استخدام السكيب واللمت والتصفية مثل `Book.find({ price: { $gte: minPrice, $lte: maxPrice } })`.
  - `findById(id)`: جلب عنصر محدد بالـ ID.
  - `findOne({ field })`: البحث بعنصر واحد (مثل الإيميل أو اسم المستخدم).
  - `save()`: حفظ وثيقة جديدة أو معدلة في القاعدة.
  - `findByIdAndUpdate(id, data, { new: true })`: تعديل الوثيقة وإرجاع النسخة الجديدة.
  - `findByIdAndDelete(id)`: حذف الوثيقة نهائياً.

---

## 5. المسارات والأنشطة (Routes & Endpoints Table)

| Method | URL | الهدف والوظيفة | الـ Controller والـ Function | Parameters / Query | Body / Form | Auth المطلوبة |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | تسجيل حساب مستخدم جديد | `authController.register` | لا يوجد | `{email, username, password}` | ❌ لا (Public) |
| **POST** | `/api/auth/login` | تسجيل الدخول وتوليد التوكن | `authController.login` | لا يوجد | `{email, password}` | ❌ لا (Public) |
| **GET** | `/api/books` | جلب جميع الكتب | `bookController.getAllBooks` | Query: `minPrice`, `maxPrice` | لا يوجد | ❌ لا (Public) |
| **GET** | `/api/books/:id` | جلب تفاصيل كتاب محدد | `bookController.getBookById` | Path: `:id` | لا يوجد | ❌ لا (Public) |
| **POST** | `/api/books` | إضافة كتاب جديد | `bookController.createNewBook` | لا يوجد | `{title, author, description, price, coverImage}` | 🔒 نعم (Admin Only) |
| **PUT** | `/api/books/:id` | تعديل بيانات كتاب | `bookController.updateBook` | Path: `:id` | `{title, author, description, price, coverImage}` | 🔒 نعم (Admin Only) |
| **DELETE** | `/api/books/:id` | حذف كتاب من القاعدة | `bookController.deleteBookById` | Path: `:id` | لا يوجد | 🔒 نعم (Admin Only) |
| **GET** | `/api/authors` | جلب جميع المؤلفين (مع الترقيم) | `authorController.getAllAuthors` | Query: `pageNumber` | لا يوجد | ❌ لا (Public) |
| **GET** | `/api/authors/:id` | جلب تفاصيل مؤلف | `authorController.getAuthorById` | Path: `:id` | لا يوجد | ❌ لا (Public) |
| **POST** | `/api/authors` | إضافة مؤلف جديد | `authorController.createAuthor` | لا يوجد | `{firstName, lastName, nationality, birthDate, image}` | 🔒 نعم (Admin Only) |
| **PUT** | `/api/authors/:id` | تعديل بيانات مؤلف | `authorController.updateAuthor` | Path: `:id` | `{firstName, lastName, nationality, birthDate, image}` | 🔒 نعم (Admin Only) |
| **DELETE** | `/api/authors/:id` | حذف مؤلف | `authorController.deleteAuthor` | Path: `:id` | لا يوجد | 🔒 نعم (Admin Only) |
| **GET** | `/api/users` | جلب قائمة جميع المستخدمين | `userController.getAllUsers` | لا يوجد | لا يوجد | 🔒 نعم (Admin Only) |
| **GET** | `/api/users/:id` | جلب ملف مستخدم محدد | `userController.getUserById` | Path: `:id` | لا يوجد | 🔒 نعم (User/Admin) |
| **PUT** | `/api/users/:id` | تعديل مستخدم | `userController.updateUser` | Path: `:id` | `{username, email, password}` | 🔒 نعم (User/Admin) |
| **DELETE** | `/api/users/:id` | حذف حساب مستخدم | `userController.deleteUser` | Path: `:id` | لا يوجد | 🔒 نعم (User/Admin) |
| **POST** | `/api/upload` | رفع صورة وسائط | `upload.js Handler` | لا يوجد | Form-Data: `image` (file) | ❌ لا (Public) |
| **GET** | `/password/forget-password` | عرض واجهة طلب استعادة كلمة السر | `passwordController.getForgotPasswordView` | لا يوجد | لا يوجد | ❌ لا (Public) |
| **POST** | `/password/forget-password` | إرسال رابط إعادة الضبط للإيميل | `passwordController.sendForgotPasswordView` | لا يوجد | `{email}` | ❌ لا (Public) |
| **GET** | `/password/reset-password/:userId/:token` | عرض واجهة كتابة كلمة السر الجديدة | `passwordController.getResetPasswordView` | Path: `:userId`, `:token` | لا يوجد | ❌ لا (Public) |
| **POST** | `/password/reset-password/:userId/:token` | حفظ كلمة السر الجديدة | `passwordController.resetThePassword` | Path: `:userId`, `:token` | `{password}` | ❌ لا (Public) |

---

## 6. التحكم والمعالجة (Controllers Deep-Dive)

تتميز جميع دوال الـ Controllers باستخدام `express-async-handler` لمنع توقف السيرفر وإتاحة التقاط الاستثناءات تلقائياً:

### أ. `authController.js`
1. **`register`**:
   - تفحص صحة المدخلات بـ `validateRegisterUser`.
   - تتأكد أن الإيميل غير موجود سابقاً بـ `User.findOne`.
   - تشفر كلمة السر بـ `bcrypt.hash(password, salt)`.
   - تحفظ المستخدم بـ `.save()` ثم تنشئ JWT Token وتحدف الشفرة من الكائن المرتجع وتخرج بـ Status `201 Created`.
2. **`login`**:
   - تفحص صحة البيانات بـ `validateLoginUser`.
   - تبحث عن الإيميل ثم تقارن الشفرة المشفرة بـ `bcrypt.compare`.
   - في حال التطابق تعيد التوكن وبيانات المستخدم بدون كلمة السر بـ Status `200 OK`.

### ب. `bookController.js`
1. **`getAllBooks`**: تدعم الفلترة بـ `minPrice` و `maxPrice` وتدمج اسم المؤلف باستخدام `.populate("author")`.
2. **`getBookById`**: تجلب الكتاب بالـ ID مع تفاصيل المؤلف وتخرج بـ `404` إذا لم تجده.
3. **`createNewBook`**: تفحص البيانات بـ `validateCreateBook` وتحفظ كتاباً جديداً بـ Status `201`.
4. **`updateBook`**: تفحص التعديلات بـ `validateUpdateBook` وتحدث بـ `findByIdAndUpdate` مع `{ new: true }`.
5. **`deleteBookById`**: تحذف الكتاب نهائياً بـ `findByIdAndDelete`.

### ج. `authorController.js`
1. **`getAllAuthors`**: تدعم الترقيم (Pagination) عبر `pageNumber`؛ بحيث تحسب الصفحات وتجلب عنصرين لكل صفحة بـ `.skip().limit()`.
2. **`createAuthor` / `updateAuthor` / `deleteAuthor`**: تنفيذ عمليات الإنشاء والتعديل والحذف مع فحص المدخلات بـ Joi.

### د. `userController.js`
1. **`updateUser`**: تفحص عدم تكرار اسم المستخدم أو الإيميل مع مستخدمين آخرين باستخدام الاستثناء `{ $ne: req.params.id }` وتشفر كلمة السر الجديدة إن وجدت إياها، وتستثني كلمة السر من الاستجابة المرتجعة بـ `.select("-password")`.
2. **`getAllUsers` / `getUserById` / `deleteUser`**: جلب وتعديل وحذف الحسابات بضوابط صلاحيات دقيقة.

---

## 7. التوثيق والصلاحيات (Authentication & Authorization)

### دورة حياة التوكن (JWT Lifecycle Flow):

```text
 Client (Login)  ───>  POST /api/auth/login  ───>  Generate JWT Token  ───>  Return Token to Client
                                                                                       │
 Client (Protected Request)  <───  Authorization: Bearer <Token>  <────────────────────┘
          │
          ▼
 verifyToken Middleware ───> Verify Secret ───> Extract req.user ───> Check Permissions ───> Next Controller
```

### كيف تعمل الـ Middlewares (`middlewares/verfiyToken.js`):

1. **`verifyToken`**:
   - يستخرج التوكن إما من `req.headers.token` أو من `req.headers.authorization` عن طريق فصل الكلمة `Bearer <token>`.
   - يفحص التوكن بـ `jwt.verify(token, secret)`.
   - إذا كان التوكن صحيحاً يخزن البيانات المشفرة في `req.user` وينتقل للدالة التالية بـ `next()`.
   - إذا كان غير موجود أو غير صالح يرجع خطأ `401 Unauthorized`.

2. **`verifyTokenAndAuthorization`**:
   - يتحقق من أن `req.user.id === req.params.id` (صاحب الحساب نفسه) أو `req.user.isAdmin === true` (الأدمن)، وإلا يرجع `403 Forbidden`.

3. **`verifyTokenAndAdmin`**:
   - يتحقق حظرياً من أن `req.user.isAdmin === true` (الأدمن فقط)، وإلا يرجع `403 Forbidden`.

---

## 8. استعادة كلمة السر (Password Reset Flow)

نظام مخصص آمن لإعادة ضبط الشفرة دون تخزين التوكنات في قاعدة البيانات:

### خطوة بخطوة:
1. **طلب الإرسال (`POST /password/forget-password`)**:
   - يدخل المستخدم إيميله، فيتم البحث عن الحساب في الداتا بيز.
   - يتم تكوين مفتاح سري مؤقت ومركب خصيصاً لهذا المستخدم:
     `const secret = process.env.JWT_SECRET + user.password;`
     > **ذكاء الفكرة:** بمجرد تغير كلمة السر لاحقاً، يتغير هذا المفتاح السري تلقائياً وتلغى صلاحية كافة روابط الاستعادة القديمة فورا!
   - يتم توليد توكن ينتهي بعد 10 دقائق (`expiresIn: "10m"`).
   - يتم إنشاء رابط مثل: `http://domain/password/reset-password/:userId/:token`.
   - يتم إرسال الإيميل باستخدام **Nodemailer** بربط حساب Gmail الخاص بـ App Password.

2. **فتح الرابط (`GET /password/reset-password/:userId/:token`)**:
   - يفحص السيرفر التوكن والمفتاح المركب، فإذا كان سليماً ورانجو الوقت متاح يظهر صفحة EJS بها النموذج لتلقي كلمة السر الجديدة.

3. **تغيير كلمة السر (`POST /password/reset-password/:userId/:token`)**:
   - يتم فحص تعقيد الشفرة الجديدة بـ `validateChangePassword`.
   - يتم إعادة فحص التوكن، ثم تشفير الشفرة الجديدة بـ `bcrypt.hash` وحفظها في قاعدة البيانات بـ `.save()`.
   - يتم رندر صفحة نجاح العملية `success-password.ejs`.

---

## 9. التحقق من البيانات وإدارة الأخطاء (Validation & Error Handling)

### التحقق من المدخلات (Joi Schema Validation):
يتم استخدام مكتبة **Joi** للتحقق من سلامة البيانات في كل موديل قبل إرسالها للداتا بيز:
- في التسجيل: يجب أن يكون الإيميل بتنسيق إيميل، واسم المستخدم لا يقل عن 3، وكلمة السر مطابقة لقواعد `joi-password-complexity`.
- في إنشاء الكتاب: يتم فحص الحد الأدنى للعنوان والوصف والقيمة السعرية وحصر أنواع الأغلفة في `["softcover", "hardcover", "ebook"]`.

### إدارة الأخطاء العامة (`middlewares/errors.js`):
- **`notFound`**: الدالة المسؤولة عن معالجة 404:
  ```javascript
  const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  ```
- **`errorHandler`**: الدالة العامة لالتقاط الأخطاء غير المتوقعة وتنسيق إخراجها:
  ```javascript
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
  };
  ```

---

## 10. رفع الملفات (File Upload with Multer)

تم تخصيص مسار الرفع في `routes/upload.js` كالتالي:

```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // اسم فريد يمنع تضارب الأسماء
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format! Please upload an image."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 }, // حد أقصى 2 ميجابايت
});
```
> **المسار:** عند إرسال `POST /api/upload` عبر `upload.single("image")` يتم التأكد من نوع الملف وحجمه وحفظه في مجلد `images` وإرجاع الرابط المحلي للصورة.

---

## 11. توثيق الـ API باستخدام Swagger UI

### إعداد Swagger بالتطبيق:
تم توثيق كل الـ Endpoints باستخدام مواصفات **OpenAPI 3.0** عبر `swagger-jsdoc` و `swagger-ui-express`:

- **تضمين التوثيق والتوجيه:**
  تم تسجيل الـ Middleware في `app.js` ليعمل على المسار `/api-docs` وتوجيه المسار الرئيسي `/` إليه:
  ```javascript
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/", (req, res) => res.redirect("/api-docs"));
  ```

- **تفعيل زر التوثيق وحساب التوكن (JWT Bearer):**
  تم إضافة نظام الأمان في `swaggerOptions`:
  ```javascript
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token in the format: Bearer <token>",
      },
    },
  }
  ```

- **خطوات تجربة الـ APIs التفاعلية (Try it out):**
  1. افتح `/api-docs`.
  2. جرب دالة `POST /api/auth/login` بالحصول على التوكن المرجع.
  3. اضغط زر **Authorize** باللون الأخضر في أعلى الصفحة، وألصق التوكن.
  4. يمكنك الآن تجربة الدوال المحمية مباشرة (مثل `POST /api/books` أو `GET /api/users`).

---

## 12. الرفع والتشغيل على Vercel (Deployment)

### طريقة العمل وتكيف المشروع لـ Vercel Serverless:
1. **الجسر البرمجي (`api/index.js`)**:
   ينشئ مجلد `api` بملف `index.js` يستورد `app.js` ويصدره لتتعامل معه Vercel كـ Serverless Function.
2. **ملف الإعدادات (`vercel.json`)**:
   يحدد تحويل جميع الأنشطة `/(.*)` نحو `/api/index.js`.
3. **قواعد البيانات السحابية (MongoDB Atlas)**:
   تم استبدال الاتصال المحلي `mongodb://localhost/...` برابط سحابي من MongoDB Atlas في متغيرات البيئة `MONGO_URL`.
4. **تجنب مشاكل إعادة الاتصال في Serverless**:
   تمت معالجة دالة الاتصال بقاعدة البيانات لمنع تكرار طلب الاتصال أثناء تشغيل الـ Warm Invocations بفضل شرط `mongoose.connection.readyState >= 1`.

---

## 13. الحاجات اللي لازم أكون فاهمها لو اتسألت في Interview

### س1: ما الفرق بين Node.js و Express.js؟
- **Node.js**: هو بيئة التشغيل الأساسية التي توفر المحرك والمكتبات الأساسية لتشغيل كود JS على السيرفر.
- **Express.js**: هو إطار عمل (Framework) يعمل فوق Node.js ويوفر أدوات مبسطة لتوجيه الـ Routes والـ Middlewares ومعالجة طلبات الـ HTTP.

### س2: ما هو الـ Middleware في Express؟ وكيف يعمل؟
الـ Middleware هي دالة تمتلك صلاحية الوصول لأجسام الطلب (`req`) والاستجابة (`res`) والدالة التالية (`next`). تقوم بتنفيذ منطق معين (مثل فحص التوكن أو تسكيل البيانات) ثم إما تنهي الطلب بإرجاع response أو تنادي `next()` لتمرير الطلب للدالة التالية.

### س3: ما الفرق بين Authentication و Authorization؟
- **Authentication (التوثيق)**: التأكد من هوية الشخص (من أنت؟) مثل الـ Login بتأكيد الإيميل والباسورد.
- **Authorization (التفويض/الصلاحيات)**: التأكد من صلاحية الشخص المسجل للقيام بعمل محدد (هل يحق لك القيام بهذا؟) مثل صلاحيات الأدمن لخيار حذف كتاب.

### س4: كيف يعمل الـ JWT؟ ومما يتكون؟
الـ JWT (JSON Web Token) هو توكن مشفر ومستقل يتكون من 3 أجزاء تفصلها نقاط (`.`):
1. **Header**: يتضمن نوع التوكن وخوارزمية التشفير.
2. **Payload**: يتضمن البيانات المخزنة (مثل ID المستخدم وهل هو أدمن).
3. **Signature**: توقيع تشفيري يضمن عدم التلاعب بالبيانات عبر دمج الـ Header والـ Payload بالمفتاح السري (Secret Key).

### س5: كيف تتم عملية معالجة الأخطاء في الدوال غير المتزامنة (Async/Await)؟
باستخدام مكتبة `express-async-handler` التي تقوم بتغليف الـ Async Route Controllers تلقائياً وتوجيه أي خطأ غير ممسوك إلى الـ Centralized Error Middleware دون الحاجة لكتابة كتل `try/catch` مكررة في كل Controller.

### س6: لماذا أضفنا شرط `if (require.main === module)` في `app.js`؟
لمنع حدوث تضارب في المنافذ (Ports) عند الرفع لـ Vercel؛ فعند التشغيل المحلي يتم تشغيل `app.listen()` لحجز بورت، أما عند الاستدعاء من بيئات Serverless يستورد النظام التطبيق دون فتح بورت دائم.

---

## 14. مخططات تدفق البيانات (Project Flow Diagrams)

### 1. مخطط تدفق الطلبات العام (General Request Flow):
```text
  [Client / Frontend / Swagger]
               │
               ▼
        [Routes Layer]
               │
               ▼
     [Middlewares Layer] ───(Logger, CORS, Helmet, BodyParser, VerifyToken)
               │
               ▼
      [Controller Layer] ───(Validation with Joi)
               │
               ▼
        [Model Layer] ───(Mongoose Schemas)
               │
               ▼
       [Database Layer] ───(MongoDB / MongoDB Atlas)
               │
               ▼
      [Response Returned] ───(JSON / HTML Views)
```

### 2. مخطط تدفق التوثيق (JWT Authentication Flow):
```text
Client                          Server                          Database
  │                               │                                │
  ├─── POST /api/auth/login ─────>│                                │
  │    (email, password)          ├─── Find User by Email ────────>│
  │                               │<── Return User Record ─────────┤
  │                               │                                │
  │                               ├── Compare Password (bcrypt)    │
  │                               ├── Generate JWT Token           │
  │<── Return Status 200 + Token ─┤                                │
  │                               │                                │
  ├─── Protected Endpoint ───────>│                                │
  │    (Header: Bearer <Token>)   ├── verifyToken Middleware       │
  │                               ├── Verify JWT Secret & Signature│
  │                               ├── Attach req.user & Check Auth │
  │<── Return Resource Data ──────┴── Execute Controller Logic ────┘
```

### 3. مخطط استعادة كلمة السر (Password Reset Flow):
```text
User                      Server                       Email Service (Nodemailer)
 │                           │                                      │
 ├── Request Reset Link ────>│                                      │
 │   (POST email)            ├── Generate Secret (JWT_SECRET + User.password)
 │                           ├── Sign JWT Token (Expires in 10m)    │
 │                           ├── Build Link & Transporter           │
 │                           ├── Send Email Request ───────────────>│
 │<── "Link Sent Page" ──────┴<── Deliver Email with Reset Link ────┤
 │                                                                  │
 ├── Click Reset Link in Email ─────────────────────────────────────┘
 │   (GET /password/reset-password/:id/:token)
 │                           │
 │                           ├── Verify Token & Secret
 │<── Return Reset Password ─┴── Render EJS Password Form
 │    View
 │
 ├── Submit New Password ───>│
 │   (POST new password)     ├── Validate with Joi
 │                           ├── Verify Token & Secret
 │                           ├── Hash New Password (bcrypt)
 │                           ├── Save to MongoDB & Render Success Page
 │<── "Success Page" ────────┘
```

---

## 15. المراجعة النهائية وقائمة التدقيق (Final Revision & Checklist)

### ملخص المشروع في صفحة واحدة:
مشروع **Bookstore API** هو تطبيق خادم (Backend RESTful API) مبني باستخدام **Node.js** و **Express.js** وقاعدة بيانات **MongoDB** عبر **Mongoose**. يوفر المشروع نظام إدارة متكامل للكتب والمؤلفين والمستخدمين، مع حماية كاملة للمسارات باستخدام **JWT Tokens** وتشفير شفرات المرور بـ **bcryptjs**، وإتاحة رفع صور الأغلفة والوسائط بـ **Multer**، واستعادة كلمة السر عبر إرسال إيميلات تفاعلية بحزمة **Nodemailer** وقوالب **EJS**. المشروع موثق بالكامل بـ **Swagger UI** ومجهز للرفع السحابي على منصة **Vercel**.

### الأوامر الأساسية المستخدمة في المشروع (CLI Commands):
```bash
# تشغيل المشروع في بيئة التطوير مع التحديث التلقائي
npm run dev

# تشغيل المشروع في البيئة الإنتاجية
npm start

# تثبيت الحزم الأساسية
npm install

# فحص حالة الرفع والتجهيز لـ Git
git status
git add .
git commit -m "Configure Swagger and Vercel deployment"
```

### قائمة التدقيق قبل الـ Interview (Pre-Interview Checklist):
- [x] فهم دور `app.js` والفرق بين `app.use` و `app.get/post`.
- [x] معرفة كيفية عمل `verifyToken` واستخراج التوكن من الـ Bearer Header.
- [x] فهم دالة `generateToken` ولماذا نمرر `id` و `isAdmin`.
- [x] فهم فكرة سر استعادة كلمة السر المركب `JWT_SECRET + user.password`.
- [x] استيعاب كيفية عمل `populate` لدمج بيانات المؤلف مع الكتاب.
- [x] فهم كيفية ضبط إعدادات Swagger وإظهار زر `Authorize`.
- [x] معرفة كيفية تكيف التطبيق مع بيئة Vercel بواسطة `api/index.js` و `vercel.json`.

---
*تم إنشاء هذا الدليل ليكون مرجعاً ختامياً كاملاً وموثوقاً لمراجعة ومذاكرة مشروع الـ Backend الخاص بك بنجاح!*
