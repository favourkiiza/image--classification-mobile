<?php

namespace app\controllers;

use app\components\ToWords;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class SiteController extends Controller
{

    public function beforeAction($action)
    {


//        if (Yii::$app->user->isGuest && Yii::$app->controller->action->id != "login") {
//
//            Yii::$app->user->loginRequired();
//
//        }

//something code right here if user valid

        return true;

    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
   /* public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }*/

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }


    public function actionLogin(){
        $raw_data = Yii::$app->request->getRawBody();
        $incomingRequest = json_decode($raw_data, true);
        Yii::trace($raw_data);
        Yii::trace($incomingRequest);

        try{
            //check userpassword
            $username = User::findByUsername(strtolower($incomingRequest['username']));
            if($username){


                    $password = Yii::$app->security->validatePassword($incomingRequest['password'], $username->password);
                    Yii::trace($password);
                    $userDetails = User::findOne(['id'=>$username->id]);




                    $userdata =[

                        'username'=>$userDetails->username,
                        'first_name'=>$userDetails->first_name,
                        'last_name'=>$userDetails->last_name,
                        'middle_name'=>$userDetails->middle_name,
                        'mobile_number'=>$userDetails->mobile_number,
                        'email_address'=>$userDetails->email_address,
                        'user_level'=>$userDetails->user_level,
                        'auth_key'=>$userDetails->auth_key,
                        'id'=>$userDetails->id

                    ];

                    Yii::trace($userDetails);

                    if($password){
                        return json_encode([
                            'returncode' => 0,
                            'returnmessage' => "SUCCESSFUL, User loggedin",
                            'userInfo'=>$userdata,
//                        'userInfo'=>$user,
//                        'district_name'=>$district_name,

                        ]);
                    }



                    else {

                            throw new ForbiddenHttpException('Invalid password');

                    }

            }
            else{


                throw new ForbiddenHttpException('Invalid Username');
            }

        } catch (\Exception $e) {
            $error = isset($e->errorInfo[2]) ? $e->errorInfo[2] : $e->getMessage();
            Yii::trace($error);
            return json_encode([
                'returncode' => 909,
                'returnmessage' => $e->getMessage(),
            ]);

        }

    }


    public function actionCreateFarmer()
    {

        $raw_data = Yii::$app->request->getRawBody();
        $incomingRequest = json_decode($raw_data, true);
        Yii::trace($raw_data);
        Yii::trace($incomingRequest);
        $connection = Yii::$app->db;
        $transaction = $connection->beginTransaction();
        try {
            $request = Yii::$app->request;
            $model = new User();
            $businesses = null;



                if ($incomingRequest) {

                    $username = User::findByUsername(strtolower($incomingRequest['User']['username']));
                    if ($username) {
                        throw new ForbiddenHttpException('Failed, Username already exists, Please choose another one');
                    } else{

                        Yii::trace($incomingRequest['User']);
//                Yii::trace($incomingRequest['Business']['business_name']);

                    /*$agentVerification = User::findOne(['id'=>$incomingRequest['Business']['agent_id']]);
                    if(!$agentVerification)
                        throw new ForbiddenHttpException('Failed, User not found');*/


                    if ($incomingRequest['User']['first_name']) {
                        $model->first_name = $incomingRequest['User']['first_name'];
                    }
                    if ($incomingRequest['User']['middle_name']) {
                        $model->middle_name = $incomingRequest['User']['middle_name'];
                    }
                    if ($incomingRequest['User']['last_name']) {
                        $model->last_name = $incomingRequest['User']['last_name'];

                    }
                    if ($incomingRequest['User']['email_address']) {
                        $model->email_address = $incomingRequest['User']['email_address'];

                    }
                    if ($incomingRequest['User']['username']) {
                        $model->username = $incomingRequest['User']['username'];

                    }
                    if ($incomingRequest['User']['contact_phone']) {
                        $model->mobile_number = $incomingRequest['User']['contact_phone'];

                    }
                    if ($incomingRequest['User']['user_level']) {
                        $model->user_level = $incomingRequest['User']['user_level'];

                    }
                    if ($incomingRequest['User']['password']) {
//                    $model->password = $incomingRequest['User']['password'];
                        $model->setPassword($incomingRequest['User']['password']);

                    }


                    $model->save();


                    if ($model->save(false)) {

                        $transaction->commit();
//                    $res = ['model' => $model];
                        return json_encode([
                            'returncode' => 0,
                            'returnmessage' => "User successfully created",
//                        'BusinessDetails' => $res
                        ]);

                    }
                }
                }
                throw new ForbiddenHttpException('Failed, No request data received');

        } catch (\Exception $e) {
            $transaction->rollBack();
            $error = isset($e->errorInfo[2]) ? $e->errorInfo[2] : $e->getMessage();
            Yii::trace('Error: ' . $error, 'CREATE  Business ROLLBACK');
            return json_encode([
                'returncode' => 909,
                'returnmessage' => $e->getMessage(),
            ]);
        }


    }

    public function actionUpdateUser()
    {
        \Yii::$app->response->format = \yii\web\Response:: FORMAT_JSON;
        $raw_data = Yii::$app->request->getRawBody();
        $incomingRequest = json_decode($raw_data, true);
        $id = $incomingRequest['User']['id'];
        Yii::trace($raw_data);
        Yii::trace($incomingRequest);
        $connection = Yii::$app->db;
        $transaction = $connection->beginTransaction();
        try {
            $request = Yii::$app->request;
            $model = $this->findModel($id);



            if ($incomingRequest) {


                Yii::trace($incomingRequest['User']);
//                Yii::trace($incomingRequest['Business']['business_name']);

                /*$agentVerification = User::findOne(['id'=>$incomingRequest['Business']['agent_id']]);
                if(!$agentVerification)
                    throw new ForbiddenHttpException('Failed, User not found');*/


                if ($incomingRequest['User']['first_name']) {
                    $model->first_name = $incomingRequest['User']['first_name'];
                }
                if ($incomingRequest['User']['middle_name']) {
                    $model->middle_name = $incomingRequest['User']['middle_name'];
                }
                if ($incomingRequest['User']['last_name']) {
                    $model->last_name = $incomingRequest['User']['last_name'];

                }
                    /*if ($incomingRequest['User']['username']) {
                        $model->username = $incomingRequest['User']['username'];

                    }*/
                if ($incomingRequest['User']['email_address']) {
                    $model->email_address = $incomingRequest['User']['email_address'];

                }

                if ($incomingRequest['User']['contact_phone']) {
                    $model->mobile_number = $incomingRequest['User']['contact_phone'];

                }


                $model->save();


                if ($model->save(false)) {

                    $transaction->commit();
//                    $res = ['model' => $model];
                    return [
                        'returncode' => 0,
                        'returnmessage' => "User data successfully edited",
//
                    ];

                }

            }
            throw new ForbiddenHttpException('Failed, No request data received');

        } catch (\Exception $e) {
            $transaction->rollBack();
            $error = isset($e->errorInfo[2]) ? $e->errorInfo[2] : $e->getMessage();
            Yii::trace('Error: ' . $error, 'Edit user ROLLBACK');
            return [
                'returncode' => 909,
                'returnmessage' => $e->getMessage(),
            ];
        }


    }


    protected function findModel($id)
    {
        if (($model = User::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    public function actionChangePassword()
    {
        \Yii::$app->response->format = \yii\web\Response:: FORMAT_JSON;
        $raw_data = Yii::$app->request->getRawBody();
        $incomingRequest = json_decode($raw_data, true);
        $connection = Yii::$app->db;
        $transaction = $connection->beginTransaction();
        $new_pass = $incomingRequest['User']['current_password'];
        if($incomingRequest){
            $request = Yii::$app->request;
            $id = $incomingRequest['User']['id'];
            $model=$this->findModel($id);
            $model->scenario = 'change';

            try {
                $data = Yii::$app->request->post();

                    $user = $model->find()->where(['id'=>$id])->limit(1)->one();

                    if(!$user->validatePassword($incomingRequest['User']['current_password'])) {
                        throw new ForbiddenHttpException('The current password you entered is wrong');
                    }

                    $model->setPassword($incomingRequest['User']['new_password']);

                if($model->save(false)){
                    $transaction->commit();

                    //Send email to user on reset
                    $fullname = $model->getFullname();
                    $emailSubject = 'Your password for Image Classification system has been reset | ' . $fullname;
                    $emailText = "Hello $fullname\n
            
            Greetings from Image Classification system!\n
            Your password has been reset. \n
            New Password: $new_pass\n
            If you did not reset your password, please contact our support team by email: info@support.com
            Cheers.";
                    ToWords::sendEmail($model->email_address,
                        $emailSubject,
                        $emailText);

                    return [
                        'returncode' => 0,
                        'returnmessage' => "Your password has been successfully changed",
                    ];
                }
            }
            catch (\Exception $e) {
                $transaction->rollBack();
                $error = isset($e->errorInfo[2]) ? $e->errorInfo[2] : $e->getMessage();
                Yii::trace('Error: ' . $error, 'Change password ROLLBACK');
                return [
                    'returncode' => 909,
                    'returnmessage' => $e->getMessage(),
                ];
            }


        } else {
            throw new ForbiddenHttpException('No data received');
        }
    }

    public function actionResetPassword(){
        \Yii::$app->response->format = \yii\web\Response:: FORMAT_JSON;
        $raw_data = Yii::$app->request->getRawBody();
        $incomingRequest = json_decode($raw_data, true);
        $connection = Yii::$app->db;
        $transaction = $connection->beginTransaction();
        $request = Yii::$app->request;

        if($incomingRequest){
            $username = $incomingRequest['User']['username'];
            $user = User::find()->where(['username'=>trim(strtolower($username))])->limit(1)->one();
            try{
            if($user) {
                $password = $user->randomPassword();
                $user->setPassword($password);

                if ($user->save(false)){
                    $transaction->commit();

                    \Yii::$app->mailer->compose()
                        ->setTo($user->email_address)
                        ->setFrom(['support@favour.ug' => "Image Classification"])
                        ->setSubject('IMAGE CLASSIFICATION SYSTEM PASSWORD RESET')
                        ->setTextBody("You successfully reset your password \n Username: " . $user->username . "\n Password: " . $password)
                        ->send();
                return [
                    'returncode' => 0,
                    'returnmessage' => "Success. Your new password has been sent to your email",
                ];
            }
            } else{
                throw new ForbiddenHttpException('User does not exist. Failed to reset your password.');
            }

            } catch (\Exception $e) {
                $transaction->rollBack();
                $error = isset($e->errorInfo[2]) ? $e->errorInfo[2] : $e->getMessage();
                Yii::trace('Error: ' . $error, 'Reset password ROLLBACK');
                return [
                    'returncode' => 909,
                    'returnmessage' => $e->getMessage(),
                ];
            }
        }
        throw new ForbiddenHttpException('No data received');
    }


}
