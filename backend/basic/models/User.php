<?php

namespace app\models;


use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;
use yii\db\Query;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "web_console_users".
 *
 * @property integer $id
 * @property string $username
 * @property string $first_name
 * @property string $mobile_number
 * @property string $email_address
 * @property integer $incorrect_access_count
 * @property string $password
 * @property string $date_created
 * @property boolean $locked
 * @property string $user_level
 * @property integer $business_id
 * @property string $user_permissions
 * @property string $password_reset_token
 * @property string $auth_key
 * @property string $date_updated
 * @property string $last_name
 * @property string $middle_name
 * @property integer $bank_id
 * @property integer $region_id
 * @property integer $district_id
 * @property string $password_expiry_date
 */
class User extends \yii\db\ActiveRecord implements IdentityInterface
{
    public $password2, $new_pass, $current_pass;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'web_mobile_users';
    }

    /**
     * @return array
     * Sets date_created and date_modified
     */
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'date_created',
                'updatedAtAttribute' => 'date_updated',
                'value' => new Expression('NOW()'),
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['username', 'first_name', 'last_name', 'mobile_number', 'email_address', 'password'], 'required', 'on'=>'create'],
            [['username', 'first_name', 'last_name', 'mobile_number', 'user_level', 'email_address'], 'required', 'on'=>'update'],
            [['current_pass', 'new_pass', 'password', 'password2'], 'required', 'on'=>'change'],
            [['username', 'first_name', 'mobile_number', 'email_address', 'password', 'user_level', 'user_permissions', 'last_name', 'middle_name'], 'string'],
            [['username', 'email_address'], 'trim'],


            [['username'], 'unique', 'message'=>'This Username has already been taken'],

            [['date_created', 'date_updated', 'password_expiry_date'], 'safe'],

            [['locked'], 'boolean'],
            [['password_reset_token', 'auth_key'], 'string', 'max' => 2044],
            [['password','new_pass'], 'string', 'min' => 8],
        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios['create'] = ['first_name', 'last_name', 'mobile_number', 'user_level', 'email_address','password'];
        $scenarios['update'] = ['username', 'first_name', 'last_name', 'mobile_number', 'user_level', 'business_id', 'bank_id', 'email_address', 'locked'];
        $scenarios['change'] = ['current_pass', 'new_pass', 'password', 'password2'];
        $scenarios['reset'] = ['new_pass', 'password', 'password2'];
        $scenarios['count'] = ['incorrect_access_count', 'locked'];
        return $scenarios;
    }



    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'first_name' => 'First Name',
            'mobile_number' => 'Mobile Number',
            'email_address' => 'Email Address',
            'incorrect_access_count' => 'Incorrect Access Count',
            'password' => 'Password',
            'password2' => 'Confirm Password',
            'new_pass' => 'New Password',
            'current_pass'=>'Current Password',
            'date_created' => 'Date Created',
            'locked' => 'Locked',
            'user_level' => 'User Level',
            'business_id' => 'Business',
            'user_permissions' => 'User Permissions',
            'password_reset_token' => 'Password Reset Token',
            'auth_key' => 'Auth Key',
            'date_updated' => 'Date Updated',
            'last_name' => 'Last Name',
            'middle_name' => 'Middle Name',
            'active'=> 'Active',
            'region_id'=>'Region',
            'district_id'=>'District'
        ];
    }





    public function diffPassword($attribute,$params)
    {

        if($this->current_pass == $this->new_pass) {
            $this->addError($attribute, 'New Password should be different');
        }
    }



    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'locked' => false]);
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => strtolower($username)]);
    }


    public function getFullname()
    {
        return $this->first_name.' '.$this->last_name;
    }
    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsernameMob($username)
    {
        return static::findOne(['username' => strtolower($username)]);
    }
    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }
        return static::findOne([
            'password_reset_token' => $token,
            'locked' => false,
        ]);
    }

    public static function randomPassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 6; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return boolean
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        $parts = explode('_', $token);
        $timestamp = (int) end($parts);
        return $timestamp + $expire >= time();
    }
    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }
    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function getHasServiceModule(){
        $result = false;
        if($bizId = Yii::$app->user->identity->business_id){
            $biz = Business::findOne($bizId);
            $result = $biz->hasServiceModule() ? true : false;
        }
        return $result;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return boolean if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }
    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }
    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }
    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }
    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }



    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            //Correct phone numbers

            if ($this->isNewRecord) {
                $this->auth_key = \Yii::$app->security->generateRandomString();

            }

            if($insert) {
                $this->username = strtolower(trim($this->username));
            }
            return true;
        } else {
            return false;
        }
    }

    public function validePhone($attribute, $params)
    {
        if (!preg_match('/^(0|256)\d{9}$/i', $this->$attribute)) {
            $this->addError($attribute, 'Please Enter a valid Phone Number');
        }
    }

    public function checkOldPassword($attribute,$id)
    {

        $user = $this->find()->where(['id'=>$id])->limit(1)->one();

        if(!$user->validatePassword($this->current_pass)) {
            $this->addError($attribute, 'Invalid or Wrong password');
        }
    }

    public function valideEmail($attribute, $params)
    {
        Yii::trace("in valide phone".$this->$attribute);
        if (!preg_match( '/^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/', $this->$attribute)) {
            $this->addError($attribute, 'Please Enter a valid Email address');
        }
    }



}
