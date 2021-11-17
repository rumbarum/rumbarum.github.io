---
title: "pytest-mock sample들"
date: "2021-11-17T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/pytest/pytest-mock/"
category: "develop"
tags:
 - "python"
 - "pytest"
 - "mock"
description: "pytest plugin 중 하나인 pytest-mock의 샘플들"
---

### required 

```bash
pip install pytest pytest-mock
```

pytest의 플러그인인 pytest-mock을 통해 mocking을 해보도록 하겠습니다. 

폴더구조와 구성은 다음 과 같습니다.

![sample](/Users/rumbarum/Project/rumbarum.github.io/static/media/pytest-mock.png)

```python
# mocking_const.py
CONST = 10000
```

```python
# mocking_export.py
class SomethingExport:
    val1 = 1000
    val2 = 1000
    val3 = 1000

    def val(self):
        return sum([self.val1, self.val2, self.val3])

def some_export_func():
    return {"message": "SUCCESS"}

```

```python
# mocking_import.py
from example.mocking_const import CONST

class SomethingImport:
    val1 = 100
    val2 = 200
    val3 = 300

    def val(self):
        return sum([self.val1, self.val2, self.val3, CONST])

def some_import_func():
    return {"message": "SUCCESS"}

```

```python
# mocking_import2.py
from mocking_export import SomethingExport, some_export_func

class SomethingImport2:
    val1 = 100
    val2 = 200
    val3 = 300

    def val(self):
        return sum([self.val1, self.val2, self.val3, SomethingExport().val()])

    def func(self):
        return some_export_func()
```

```python
# mocking_tests.py
import pytest

from example.mocking_import import SomethingImport
from example.mocking_import2 import SomethingImport2

class Something:
    val1 = 100
    val2 = 200
    val3 = 300

    def val(self):
        return sum([self.val1, self.val2, self.val3])

def some_func():
    return {"message": "SUCCESS"}

class TestMockingClass:
    """pytest-mock 라이브러리 mocker fixture 예시입니다."""

    def test_patch_direct_func(self, mocker):
        """
        직접 함수 리턴 값을 조작할 경우에는 MagicMock 객체를 활용합니다.
        .return_value를 통해 ()으로 호출시 return할 값을 지정할 수 있습니다.
        """
        some_func = mocker.MagicMock()
        some_func.return_value = {"message": "patched"}
        assert some_func() == {"message": "patched"}

    def test_patch_direct_func2(self, mocker):
        """
        MagicMock 초기화시에 return_values를 kwargs로 입력해도 됩니다.
        """
        some_func = mocker.MagicMock(return_value={"message": "patched"})
        assert some_func() == {"message": "patched"}

    def test_patch_imported_func(self, mocker):
        """
        tests.py 모듈 밖에서의 동작에 관여하려면, mocker.patch()를 사용합니다.
        ()으로 호출시 return할 값을 지정할 수 있습니다
        patch는 해당 라인 동작시에 동작합니다.
        _tests.py 모듈에 먼저 import 되어 있을경우 patch 동작이 기대한대로 동작하지 않습니다.
				patch() 후 import 하여야 합니다.
        """
        mocker.patch("example.mocking_import.some_import_func", return_value={"message": "patched"})
        from example.mocking_import import some_import_func

        assert some_import_func() == {"message": "patched"}

    def test_patch_func_hook(self, mocker):
        """
        tests.py 모듈 밖에서의 동작을 mocking 하려면, mocker.patch()를 사용합니다.
        ()으로 호출시 return할 값을 지정할 수 있습니다 return_value=<value>
        B.py 모듈에서 A.py module의 func_a 함수를 가져다 사용할경우, 
				func_a 함수를 임포트한 B.py 모듈에서 patch 해야 합니다.
				단, 
				from A import func_a 가 아니라
				import A 
				A.func_a 
				로 사용한 경우에는, A를 patch 해야 합니다.
        """
        mocker.patch("example.mocking_import2.some_export_func", return_value={"message": "patched"})
        from example.mocking_import2 import SomethingImport2

        assert SomethingImport2().func() == {"message": "patched"}

    def test_patch_objcect_class_method_and_attr_direct_reference(self, mocker):
        """ _tests.py 에 정의된 Something.val patch.object를 이용해 mocking 합니다."""

        # patch가 아닌, patch.object 를 사용합니다.
        mocker.patch.object(Something, "val")

        # some 은 Something의 instance 입니다.
        some = Something()

        # some.val 은 Mock 객체입니다.
        # some.val.return_value 를 통해서 값을 지정할 수 있습니다.
        # mocker.patch.object(Something, "val", return_value=9999) 도 동일한 결과를 만듭니다.
        some.val.return_value = 9999

        assert some.val(1, 2, 3, 4, 5) == 9999
        assert isinstance(some, Something)
        # mock 객체가 호출되었는지 assert 합니다.
        some.val.assert_called()

        # mock 객체가 지정한 인자들과 호출되었는지 assert 합니다.
        some.val.assert_called_once_with(1, 2, 3, 4, 5)

    def test_patch_objcect_instance_attr_direct_reference(self, mocker):
        """ _tests.py 에 정의된 Something.val3 patch.object를 이용해 mocking 합니다."""

        # patch.object(class, attr_name, val) 을 쓸 경우, 
				# instance.attr_val == val 입니다.
        mocker.patch.object(Something, "val3", 100000)
        some = Something()
        assert some.val3 == 100000

    def test_patch_object_const_direct(self, mocker):
        """ 외부 모듈에 에 정의된 CONST 를 mocking 합니다."""

        #  SomthingImport가 사용하는 mocking_import의 CONST를 현재 모듈에서 patch.object() 로 20000 으로  patch 합니다.
        import example.mocking_import as mi

        mocker.patch.object(mi, "CONST", 20000)
        some = SomethingImport()

        assert some.val() == 20600

    def test_patch_const_hook(self, mocker):
        #  SomthingImport가 정의된 module에서 CONST를 patch() 로 20000 으로 patch 합니다.
        mocker.patch("example.mocking_import.CONST", 20000)
        some = SomethingImport()
        assert some.val() == 20600

    def test_patch_object_with_direct_import(self, mocker):
        """import 한 SomethingImport.val이 mock 객체를 반환하도록 patch 합니다. """
        mocker.patch.object(SomethingImport, "val", return_value=30600)
        some_mocked = SomethingImport()
        assert some_mocked.val() == 30600

    def test_patch_with_direct_import(self, mocker):
				"""
				mocker.patch를 사용하여 import 한 SomethingImport patch
				"""
        mocker.patch("example.mocking_import.SomethingImport")
        # patch를 걸고, SomthingImport를 import 해야 합니다.
        # 해당 모듈레벨에서 SomthingImport를 import 하고 있다면
        # 이름을 다르게 하지 않으면 모듈 레벨에서 Import 한 SomethingImport(Not Mock)를 호출한다.
        from example.mocking_import import SomethingImport as SI

        instance = SI.return_value
        instance.val.return_value = 30600
        some_mocked = SI()
        assert some_mocked.val() == 30600

    def test_patch_other_module_hook(self, mocker):
        "SomethingExport가 정의된 module이 아닌, SomethingExport를 사용하는 module에서 원하는 값이 나오도록 patch 한다. "
        
				# mock 객체가 리턴할 값을 mock 객체로 지정합니다.
				mocked_something_export = mocker.patch("example.mocking_import2.SomethingExport")

				# mock 객체가 리턴할 값을 지정합니다.
        instance = mocked_something_export.return_value
				# mock 객체의 val method가 리턴할 값을 지정합니다.
        instance.val.return_value = 6000

				# patch 한 SomethingExport를 사용하는 SomethingImport2를 초기화합니다.
        something_import2 = SomethingImport2()
        assert something_import2.val() == 6600

		def test_side_effect(self, mocker):
				"""
				단순 값의 return이 아닌, 원하는 함수 동작을 지정할 수 도 있습니다.
				Mock(side_effect=<func>) 와 동일합니다.
				Exception('Boom!')
				"""
        def _side_1():
	        return "SIDE_WORKING"
				
				def _side_2():
					raise Exception("Error")	
				
				# Something의 instance.val 이 _side_1을 call 하도록 만든다
        mocker.patch.object(Something, "val", side_effect=_side_1)
        some = Something()
        assert some.val() == "SIDE_WORKING"

				# Something의 instance.val 이 _side_2(raise Exception)을 하도록 만든다
        mocker.patch.object(Something, "val", side_effect=_side_2)
				some2 = Something()
				# pytest raise 처리
				with pytest.raises(Exception):
            some2.val()
```

