using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class target_mover : MonoBehaviour
{
    [SerializeField] float speed;
    Rigidbody rb;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
    }
    private void Update()
    {
        int horiz = 25;
        int vertic = -25;

        transform.Translate(horiz * speed * Time.deltaTime, 0, vertic * speed * Time.deltaTime);
        

    }
}
